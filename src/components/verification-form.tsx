"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { VerifySchema } from "@/lib/schemas/authSchema"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { useParams, useRouter } from "next/navigation"

export default function InputOTPForm() {

    const params = useParams<{ username: string; }>();

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [sending, setSending] = useState<boolean>(false);

    const form = useForm<z.infer<typeof VerifySchema>>({
        resolver: zodResolver(VerifySchema),
        defaultValues: {
            otp: "",
        },
    })

    async function onSubmit(data: z.infer<typeof VerifySchema>) {
        const { otp } = data;
        try {
            setLoading(true);
            const response = await axios.post(`/api/verify-email?username=${params.username}`, {
                otp
            })

            router.replace(`/signin`);

            toast.success(response.data.message);

        } catch (error) {
            console.error("email verification Error: ", error);
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    async function sendVerificationEmail() {
        try {
            setSending(true);
            const response = await axios.post('/api/send-verification-email',
                { username: params.username }
            );

            toast.success(response.data.message);

        } catch (error) {
            console.error("send verification email verification Error: ", error);
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.message);
            }
        } finally {
            setSending(false);
        }
    }

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">Verify Your Account</h1>
                <p className="text-muted-foreground">
                    We&#39;ve sent a 6-digit verification code to your email. Please enter it below to complete your registration.
                </p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>One-Time Password</FormLabel>
                                <FormControl>
                                    <InputOTP maxLength={6} pattern="^[0-9]+$" {...field}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} inputMode="numeric" />
                                            <InputOTPSlot index={1} inputMode="numeric" />
                                            <InputOTPSlot index={2} inputMode="numeric" />
                                            <InputOTPSlot index={3} inputMode="numeric" />
                                            <InputOTPSlot index={4} inputMode="numeric" />
                                            <InputOTPSlot index={5} inputMode="numeric" />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormDescription>
                                    Please enter the verification code sent to your email
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-col gap-3">
                        <Button type="submit" disabled={loading || sending} className="w-full">
                            {
                                loading ?
                                    <>
                                        <Loader2 className="animate-spin" />
                                        Please wait
                                    </> :
                                    "Verify"
                            }
                        </Button>
                        <Button type="button" disabled={loading || sending} onClick={sendVerificationEmail} variant="outline" className="w-full">
                            {
                                sending ?
                                    <>
                                        <Loader2 className="animate-spin" />
                                        Please wait
                                    </> :
                                    "Resend Code"
                            }
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
