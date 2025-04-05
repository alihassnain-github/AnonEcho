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

export default function InputOTPForm() {
    const form = useForm<z.infer<typeof VerifySchema>>({
        resolver: zodResolver(VerifySchema),
        defaultValues: {
            pin: "",
        },
    })

    function onSubmit(data: z.infer<typeof VerifySchema>) {
        console.log(data)
    }

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">Verify Your Account</h1>
                <p className="text-muted-foreground">
                    We've sent a 6-digit verification code to your email. Please enter it below to complete your registration.
                </p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="pin"
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
                        <Button type="submit" className="w-full">
                            Verify
                        </Button>
                        <Button type="button" variant="outline" className="w-full">
                            Resend Code
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
