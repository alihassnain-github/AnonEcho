import NextAuth from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { SignInSchema } from "./lib/schemas/authSchema"
import bcrypt from "bcryptjs"
import connectDB from "./lib/dbConnect"
import { UserModel } from "./models/User"

export const { handlers, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                await connectDB();
                try {
                    let user = null

                    const { email, password } = await SignInSchema.parseAsync(credentials)

                    user = await UserModel.findOne({ email });
                    if (!user) {
                        throw new Error("Invalid credentials.")
                    }

                    if (!user.isVerified) {
                        throw new Error("Account not verified.")
                    }

                    const isVaildPassword = await bcrypt.compare(password, user.password);
                    if (!isVaildPassword) {
                        throw new Error("Wrong Password")
                    }

                    // return JSON object with the user data
                    return user
                } catch (error) {
                    if (error instanceof ZodError) {
                        return null
                    }
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
        signIn: "auth/signin",
    },
    session: {
        strategy: "jwt",
    }
})