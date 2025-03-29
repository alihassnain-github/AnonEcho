import NextAuth from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { SignInSchema } from "./lib/schemas/authSchema"
import bcrypt from "bcryptjs"
import connectDB from "./lib/dbConnect"

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

                    // logic to salt and hash password
                    const pwHash = bcrypt.compare();

                    // logic to verify if the user exists
                    user = await getUserFromDb(email, pwHash)

                    if (!user) {
                        throw new Error("Invalid credentials.")
                    }

                    // return JSON object with the user data
                    return user
                } catch (error) {
                    if (error instanceof ZodError) {
                        return null
                    }
                }
            },
        }),
    ],
})