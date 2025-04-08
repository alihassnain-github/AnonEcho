import { MessageSquare } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 w-full border-b border-gray-200 dark:border-gray-800 bg-background z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <MessageSquare className="h-6 w-6" />
                    <span className="text-xl font-bold">AnonEcho</span>
                </Link>
                <div className="flex items-center gap-4">
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/#how-it-works" className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300">
                            How It Works
                        </Link>
                    </nav>
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
                </div>
            </div>
        </header>
    )
}
