"use client"

import { MessageSquare, Trash2 } from "lucide-react"
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

export default function FeedbackCard() {
    return (
        <Card className="border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
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
                    "The team meeting format has improved dramatically since we started collecting anonymous feedback.
                    People are more honest now."
                </p>
            </CardContent>
            <CardFooter className="text-xs text-gray-500 border-t pt-2">Received 2 hours ago</CardFooter>
        </Card>
    )
}
