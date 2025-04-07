import connectDB from "@/lib/dbConnect";
import { VerifySchema } from "@/lib/schemas/authSchema";
import { UserModel } from "@/models/User";

export async function POST(request: Request) {
    await connectDB();
    try {
        const { searchParams } = new URL(request.url);

        const username = searchParams.get("username");

        const body = await request.json();
        const parsed = VerifySchema.safeParse(body);
        if (!parsed.success || !username) {
            return Response.json({ message: "Invalid request", success: false }, { status: 400 });
        }

        const { otp } = parsed.data;

        // find user by email 
        const user = await UserModel.findOne({ username });
        if (!user) {
            return Response.json({ message: "Account not found", success: false }, { status: 404 });
        }

        // check otp and expiry
        const isValidOtp = user.otp === otp;
        const isValidOtpExpiry = user.otpExpiry > new Date();

        if (!isValidOtp) {
            return Response.json({ message: "Incorrect verification code", success: false }, { status: 401 });
        }

        if (!isValidOtpExpiry) {
            return Response.json({ message: "Verification code has expired. Please request a new one.", success: false }, { status: 403 });
        }

        user.isVerified = true;
        await user.save();
        return Response.json({ message: "User verified successfully", success: false }, { status: 200 });

    } catch (error) {
        return Response.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}