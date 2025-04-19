/* eslint-disable */
import NextAuth, { DefaultSession, DefaultUser, JWT } from "next-auth";

// Extend User Type
declare module "next-auth" {
    interface Session {
        user: {
            _id?: string;
            username?: string;
            isVerified?: boolean;
            acceptMessage?: boolean;
        } & DefaultSession["user"];
    }

    interface User {
        _id?: string;
        username?: string;
        isVerified?: boolean;
        acceptMessage?: boolean;
    }
}

// Extend JWT Token Type
declare module "next-auth/jwt" {
    interface JWT {
        _id?: string;
        username?: string;
        isVerified?: boolean;
        acceptMessage?: boolean;
    }
}
