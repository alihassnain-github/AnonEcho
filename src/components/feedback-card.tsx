"use client"

import { Inbox, MessageSquare, Trash2 } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { useEffect } from "react"
import useMessages from "@/store/useMessages"
import { Skeleton } from "./ui/skeleton"

export default function FeedbackCard() {

    const { loading, messages, fetchMessages } = useMessages();


    useEffect(() => {
        // fetch feedback messages initially
        fetchMessages();
    }, []);

    if (loading) {
        return (
            <>
                {Array.from({ length: 4 }).map((_, index) => (
                    <Card key={index} className="border shadow-sm mb-4">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div className="flex gap-4 items-center">
                                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                <Skeleton className="h-5 w-40" />
                            </div>
                            <Trash2 className="h-4 w-4 text-muted-foreground opacity-50" />
                        </CardHeader>
                        <CardContent className="pb-3">
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-[90%] mb-2" />
                            <Skeleton className="h-4 w-[80%]" />
                        </CardContent>
                        <CardFooter className="pt-2 border-t">
                            <Skeleton className="h-4 w-32" />
                        </CardFooter>
                    </Card>
                ))}
            </>
        );
    }

    return (
        <>
            {messages.length > 0 ? messages.map(({ _id, text, createdAt }) => (
                <Card key={_id} className="border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                    <CardHeader className="pb-2 flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" /> Anonymous Feedback
                        </CardTitle>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-500">
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete feedback</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Delete Feedback</DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to delete this feedback?
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button variant="outline">
                                        Cancel
                                    </Button>
                                    <Button variant="destructive">
                                        Delete
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            "{text}"
                        </p>
                    </CardContent>
                    <CardFooter className="text-xs text-gray-500 border-t pt-2">{new Date(createdAt).toDateString()}</CardFooter>
                </Card>
            )) :
                <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground absolute left-1/2	-translate-x-1/2">
                    <Inbox className="w-10 h-10 mb-2 text-gray-400" />
                    <p className="text-sm">No messages yet</p>
                </div>
            }
        </>
    )
}
