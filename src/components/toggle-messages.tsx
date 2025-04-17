"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Switch } from "@/components/ui/switch"
import { AcceptMessageSchema } from "@/lib/schemas/messageSchema"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "./ui/form"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { RefreshCcw } from "lucide-react"
import useMessages from "@/store/useMessages"

export default function ToggleAcceptMessages() {

    const { fetchMessages, acceptMessage } = useMessages();

    const form = useForm<z.infer<typeof AcceptMessageSchema>>({
        resolver: zodResolver(AcceptMessageSchema),
        defaultValues: {
            acceptMessage: false,
        },
    })

    useEffect(() => {
        form.setValue("acceptMessage", acceptMessage);
    }, [acceptMessage]);

    const [loading, setLoading] = useState(false)

    const handleToggle = async (newValue: boolean) => {

        form.setValue("acceptMessage", newValue)

        setLoading(true)
        try {
            const response = await axios.post('/api/accept-message', {
                acceptMessage: newValue,
            })
            toast.success(response.data.message);
        } catch (error) {
            console.error("Message Preferance Error: ", error);
            form.setValue("acceptMessage", !newValue)
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-between md:justify-end w-full gap-x-8">
            <Form {...form}>
                <form className="flex items-center space-x-2">
                    <FormField
                        control={form.control}
                        name="acceptMessage"
                        render={({ field }) => (
                            <FormItem className="flex gap-2 items-center">
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={handleToggle}
                                        disabled={loading}
                                    />
                                </FormControl>
                                <FormLabel>Accept Messages</FormLabel>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            <Button type="button" onClick={fetchMessages} size={"icon"}>
                <RefreshCcw size={18} />
            </Button>
        </div>
    )
}
