import connectDB from "@/lib/dbConnect";
import { SendEmailSchema } from "@/lib/schemas/authSchema";
import sendVerificationEmail from "@/lib/sendVerificationEmail";
import { UserModel } from "@/models/User";
import generateOTP from "@/utils/generateOtp";

export async function POST(request: Request) {
    await connectDB();
    try {
        const body = await request.json();

        const parsed = SendEmailSchema.safeParse(body);
        if (!parsed.success) {
            return Response.json({ message: "Invalid request", success: false }, { status: 400 });
        }

        const { username } = parsed.data;

        const user = await UserModel.findOne({ username });
        if (!user) {
            return Response.json({ message: "Account not found", success: false }, { status: 404 });
        }

        if (user.isVerified) {
            return Response.json({ message: "Your email is already verified.", success: false }, { status: 400 });
        }

        const otp = generateOTP();
        const otpExpiry = new Date();
        otpExpiry.setHours(otpExpiry.getHours() + 24);

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        const { email } = user;

        const emailResponse = await sendVerificationEmail({ username, email, otp });
        if (!emailResponse.success) {
            return Response.json({ message: emailResponse.message, success: emailResponse.success }, { status: 500 });
        }

        return Response.json({ message: "A verification email has been sent to your email.", success: true }, { status: 200 });

    } catch (error) {
        return Response.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}