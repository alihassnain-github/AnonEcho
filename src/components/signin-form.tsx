"use client"

import { signIn } from "next-auth/react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SignInSchema } from "@/lib/schemas/authSchema"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function SignInForm() {

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(data: z.infer<typeof SignInSchema>) {
        const { email, password } = data;
        try {
            setLoading(true);
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                let parsedError;

                try {
                    parsedError = JSON.parse(res.error);
                } catch {
                    parsedError = null;
                }

                if (parsedError?.code === "EMAIL_NOT_VERIFIED") {
                    toast(parsedError.message, {
                        action: {
                            label: 'Verify now',
                            onClick: () => router.replace(`/verify/${parsedError.username}`)
                        },
                    })
                } else {
                    console.error(res.error);
                    toast.error(res.error);
                }
            } else {
                router.replace("/dashboard");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <div className="space-y-2 text-center mb-6">
                <h1 className="text-2xl font-bold">Sign in to your account</h1>
                <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
            </div>

            <Button variant="outline" className="w-full mb-3 flex items-center justify-center" onClick={() => signIn("google")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                    <path
                        fill="currentColor"
                        d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                    />
                </svg>
                Sign in with Google
            </Button>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">OR CONTINUE WITH</span>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="m@example.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center justify-end">
                        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <Button type="submit" disabled={loading} className="w-full">
                        {
                            loading ?
                                <>
                                    <Loader2 className="animate-spin" />
                                    Please wait
                                </> :
                                "Sign in"
                        }
                    </Button>

                    <div className="text-center text-sm mt-4">
                        <span className="text-muted-foreground">Don&amp;#39;t have an account? </span>
                        <Link href="/signup" className="text-primary hover:underline">
                            Create one
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    )
}

