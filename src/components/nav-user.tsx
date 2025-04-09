"use client"

import { useSession, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import Link from "next/link"

export function NavUser() {

    const { data: session } = useSession()

    const [avatarFallback, setAvatarFallback] = useState<string | undefined>(undefined);
    useEffect(() => {
        if (session?.user) {
            const initials = session.user.username?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
            setAvatarFallback(initials);
        }
    }, [session?.user]);

    return (
        <>
            {session ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={session?.user.image || "/placeholder.svg?height=32&width=32"} alt={session?.user.username} />
                                <AvatarFallback>{avatarFallback}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start text-left">
                                <span className="font-medium">{session?.user.username}</span>
                                <span className="text-xs text-muted-foreground">{session?.user.email}</span>
                            </div>
                            <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Link href={"/dashboard"} className="w-full">
                                    Dashboard
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={"/signin"}>
                            Log in
                        </Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href={"/signup"}>
                            Sign up
                        </Link>
                    </Button>
                </div>
            )}
        </>
    )
}
