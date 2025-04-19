import VerifyEmail from "@/components/email-template";
import { resend } from "./resend";

interface sendVerificationEmailProps {
    username: string,
    email: string,
    otp: string,
}

export default async function sendVerificationEmail({ username, email, otp }: sendVerificationEmailProps) {
    try {
        await resend.emails.send({
            from: 'AnonEcho <onboarding@resend.dev>',
            to: email,
            subject: 'Verify Your Email Address',
            react: VerifyEmail({ username, otp }),
        });
        return { success: true, message: "Verification email send successfuly" };
    } catch (error) {
        console.error("Error creating user :", error);
        return { success: false, message: "Failed to send Verification email" };
    }
}