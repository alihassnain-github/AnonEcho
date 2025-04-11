import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <div className="max-w-md space-y-8">
                {/* 404 number with visual styling */}
                <div className="text-8xl font-bold text-primary/20">404</div>

                {/* Icon for the 404 page */}
                <div className="mx-auto bg-muted rounded-full p-6 w-24 h-24 flex items-center justify-center">
                    <Search className="h-12 w-12 text-muted-foreground" />
                </div>

                <h1 className="text-4xl font-bold tracking-tight">Page Not Found</h1>

                <p className="text-xl text-muted-foreground">We couldn't find the page you were looking for.</p>

                <p className="text-muted-foreground">
                    The page may have been moved, deleted, or perhaps never existed. Let's get you back to where you need to be.
                </p>

                <div className="pt-6">
                    <Button asChild className="px-8">
                        <Link href="/">Return to Home</Link>
                    </Button>
                </div>
            </div>

            <div className="mt-16 text-sm text-muted-foreground">
                <p>If you believe this is an error, please contact our support team.</p>
            </div>
        </div>
    )
}
