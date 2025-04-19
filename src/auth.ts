import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { SignInSchema } from "./lib/schemas/authSchema"
import bcrypt from "bcryptjs"
import connectDB from "./lib/dbConnect"
import { UserModel } from "./models/User"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
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

                    if (!user.password) {
                        throw new Error("This account was created using Google. Please continue with Google to sign in.");
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
            await connectDB();

            if (user) {
                let dbUser = await UserModel.findOne({ email: user.email });

                if (!dbUser) {
                    const newUsername = user.name?.replace(/\s+/g, "_").toLowerCase() || "user_" + Date.now();

                    dbUser = await UserModel.create({
                        email: user.email,
                        username: newUsername,
                        isVerified: true,
                        acceptMessage: true,
                    });
                }

                token._id = dbUser._id.toString();
                token.username = dbUser.username;
                token.isVerified = dbUser.isVerified;
                token.acceptMessage = dbUser.acceptMessage;
            }

            return token;
        },
        async session({ session, token }) {
            session.user._id = token._id as string;
            session.user.username = token.username as string;
            session.user.isVerified = token.isVerified as boolean;
            session.user.acceptMessage = token.acceptMessage as boolean;
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