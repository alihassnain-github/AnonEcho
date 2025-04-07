import { NextAuthOptions } from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { SignInSchema } from "./lib/schemas/authSchema"
import bcrypt from "bcryptjs"
import connectDB from "./lib/dbConnect"
import { UserModel } from "./models/User"

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    await connectDB();

                    const { email, password } = await SignInSchema.parseAsync(credentials);

                    const user = await UserModel.findOne({ email });
                    if (!user) {
                        throw new Error("Invalid credentials.");
                    }

                    if (!user.isVerified) {
                        const customError = {
                            message: "Please verify your email before logging in.",
                            code: "EMAIL_NOT_VERIFIED",
                            username: user.username
                        };
                        throw new Error(JSON.stringify(customError));
                    }

                    const isVaildPassword = await bcrypt.compare(password, user.password);
                    if (!isVaildPassword) {
                        throw new Error("Incorrect password.");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.username,
                        _id: user._id.toString(),
                        username: user.username,
                        isVerified: user.isVerified,
                        acceptMessage: user.acceptMessage
                    };
                } catch (error) {
                    if (error instanceof ZodError) {
                        return null;
                    }

                    throw error;
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id;
                token.username = user.username;
                token.isVerified = user.isVerified;
                token.acceptMessage = user.acceptMessage;
            }
            return token;
        },
        async session({ session, token }) {
            session.user._id = token._id as string;
            session.user.username = token.username as string;
            session.user.isVerified = token.isVerified as boolean;
            session.user.acceptMessage = token.acceptMessage as string;
            return session;
        }
    },
    pages: {
        signIn: "/signin",
    },
    session: {
        strategy: "jwt",
    }
}