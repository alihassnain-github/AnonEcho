"use client"

import axios from "axios"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SignUpSchema } from "@/lib/schemas/authSchema"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"

export default function SignUpForm() {

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })

    async function onSubmit(data: z.infer<typeof SignUpSchema>) {
        const { username, email, password } = data;
        try {
            setLoading(true);
            const response = await axios.post('/api/signup', {
                username,
                email,
                password
            })

            router.replace(`/verify/${username}`);

            toast.success(response.data.message);

        } catch (error) {
            console.error("registration Error: ", error);
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <div className="space-y-2 text-center mb-6">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-sm text-muted-foreground">Enter your email below to create your account</p>
            </div>

            <Button variant="outline" className="w-full mb-3 flex items-center justify-center" onClick={() => signIn("google")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                    <path
                        fill="currentColor"
                        d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                    />
                </svg>
                Google
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
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="johndoe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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

                    <Button type="submit" disabled={loading} className="w-full">
                        {
                            loading ?
                                <>
                                    <Loader2 className="animate-spin" />
                                    Please wait
                                </> :
                                "Create account"
                        }
                    </Button>
                    <div className="text-center text-sm mt-4">
                        <span className="text-muted-foreground">Already have an account? </span>
                        <Link href="/signin" className="text-primary hover:underline">
                            Sign in
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    )
}

