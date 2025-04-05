import NextAuth, { DefaultSession, DefaultUser, JWT } from "next-auth";

// Extend User Type
declare module "next-auth" {
    interface Session {
        user: {
            _id?: string;
            username?: string;
            isVerified?: boolean;
            acceptMessage?: string;
        } & DefaultSession["user"];
    }

    interface User {
        _id?: string;
        username?: string;
        isVerified?: boolean;
        acceptMessage?: string;
    }
}

// Extend JWT Token Type
declare module "next-auth/jwt" {
    interface JWT {
        _id?: string;
        username?: string;
        isVerified?: boolean;
        acceptMessage?: string;
    }
}
