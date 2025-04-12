"use client"

import axios from "axios"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Loader2, MessageSquare, Search } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { MessageSchema } from "@/lib/schemas/messageSchema"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"
import { Skeleton } from "./ui/skeleton"

type MessageFormProps = {
    username: string
}

export default function MessageForm({ username }: MessageFormProps) {

    const [loading, setLoading] = useState<boolean>(false);
    const [suggestionLoading, setSuggestionLoading] = useState<boolean>(false);

    const [suggestions, setSuggestions] = useState<string[] | null>(null);

    const [open, setOpen] = useState(false)

    useEffect(() => {
        // Open dialog after window loads
        const timer = setTimeout(() => {
            setOpen(true)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    async function suggestMessages() {
        try {
            setSuggestionLoading(true);
            const response = await axios.get('/api/suggest-messages');

            setSuggestions(response.data.messages)

        } catch (error) {
            console.error("Error generating messages:", error);
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.message);
            }
        } finally {
            setSuggestionLoading(false);
        }
    }

    useEffect(() => {
        suggestMessages();
        // suggest messages to user on component mount
    }, [])

    const form = useForm<z.infer<typeof MessageSchema>>({
        resolver: zodResolver(MessageSchema),
        defaultValues: {
            text: "",
        },
    })

    async function onSubmit(data: z.infer<typeof MessageSchema>) {
        const { text } = data;
        try {
            setLoading(true);
            const response = await axios.post('/api/send-message', {
                username,
                text,
            })
            toast.success(response.data.message);
            form.reset();
        } catch (error) {
            console.error("Sending message Error: ", error);
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-6">

            {/* dialog */}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <div className="flex flex-col items-center gap-2 mb-2">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-200">
                                <MessageSquare className="h-6 w-6 text-primary" />
                            </div>
                            <DialogTitle className="mt-4">Collect Anonymous Feedback Now</DialogTitle>
                        </div>
                    </DialogHeader>
                    <div className="flex justify-center">
                        <Button size="lg" className="w-full" asChild>
                            <Link href="/signup">
                                Click here to create an account
                            </Link>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="space-y-2 text-center mb-6">
                <h1 className="text-2xl font-bold">Public Profile Link</h1>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                                <FormControl>
                                    <Textarea
                                        autoFocus
                                        placeholder="Message"
                                        className="h-24"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={loading || suggestionLoading} className="w-full">
                        {
                            loading ?
                                <>
                                    <Loader2 className="animate-spin" />
                                    Please wait
                                </> :
                                "Send Message"
                        }
                    </Button>
                </form>
            </Form>

            {/* messages */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">Suggested Messages</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                    {!suggestions && (
                        Array.from({ length: 5 }, (_, index) => (
                            <Skeleton key={index} className="w-full h-10" />
                        ))
                    )}
                    {suggestions && suggestions.map((suggestion, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            className="w-full whitespace-normal justify-start text-left h-auto"
                            onClick={() => form.setValue("text", suggestion)}
                        >
                            {suggestion}
                        </Button>
                    ))}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button disabled={loading || suggestionLoading} onClick={suggestMessages}>
                        {
                            suggestionLoading ?
                                <>
                                    <Loader2 className="animate-spin" />
                                    Please wait
                                </> :
                                <>
                                    <span>Suggest Messages</span>
                                    <Search className="h-4 w-4" />
                                </>
                        }
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

