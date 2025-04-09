"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react"

export default function WithAuth({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}