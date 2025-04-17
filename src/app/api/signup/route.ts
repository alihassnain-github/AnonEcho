import bcrypt from "bcryptjs";
import connectDB from "@/lib/dbConnect";
import { SignUpSchema } from "@/lib/schemas/authSchema";
import { UserModel } from "@/models/User";
import sendVerificationEmail from "@/lib/sendVerificationEmail";
import generateOTP from "@/utils/generateOtp";

export async function POST(request: Request) {
    await connectDB();

    try {

        const body = await request.json();
        const parsed = SignUpSchema.safeParse(body);

        if (!parsed.success) {
            return Response.json({ message: "Invalid request", success: false }, { status: 400 });
        }

        const { username, email, password } = parsed.data;

        // check if user already exist
        const exisitingUser = await UserModel.findOne({ email });
        if (exisitingUser) {
            return Response.json({ message: "Account already exists. Please try logging in", success: false }, { status: 409 });
        }

        // check if username alreay exist
        const exisitingUserName = await UserModel.findOne({ username });
        if (exisitingUserName) {
            return Response.json({ message: "Username already taken. Please try a different one", success: false }, { status: 409 });
        }

        // generate otp
        const otp = generateOTP();
        // otp expiry (24 hours)
        const otpExpiry = new Date();
        otpExpiry.setHours(otpExpiry.getHours() + 24);

        // encrypt password
        const hash = await bcrypt.hash(password, 10);

        // sent verification email to user
        const emailResponse = await sendVerificationEmail({ username, email, otp });
        if (!emailResponse.success) {
            return Response.json({ message: emailResponse.message, success: false }, { status: 500 });
        }

        await UserModel.create({
            username,
            email,
            password: hash,
            otp,
            otpExpiry,
            messages: [],
        });

        return Response.json({ message: "A verification email has been sent to your email", success: true }, { status: 201 });
    } catch (error) {
        console.error("Error creating user :", error);
        return Response.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }

}