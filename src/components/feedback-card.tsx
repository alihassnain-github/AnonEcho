"use client"

import { Trash2, X } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface FeedbackProps {
    feedback: {
        id: number
        text: string
        type: string
        rating: number
        date: string
    }
    onDelete: () => void
}

export default function FeedbackCard({ feedback }: FeedbackProps) {
    return (
        <Card className="bg-gray-900 border-gray-800 text-white relative">
            <button
                className="absolute right-12 top-4 p-1 hover:bg-gray-800 rounded-full"
                aria-label="Delete feedback"
            >
                <Trash2 size={18} />
            </button>
            <button className="absolute right-4 top-4 p-1 hover:bg-gray-800 rounded-full" aria-label="Close feedback">
                <X size={18} />
            </button>

            <CardContent className="pt-6">
                <p className="text-white mb-4">{feedback.text}</p>
                <div className="flex gap-2">
                    <span className="bg-gray-800 text-xs px-3 py-1 rounded-full">{feedback.type}</span>
                    <span className="bg-gray-800 text-xs px-3 py-1 rounded-full">Rating: {feedback.rating}</span>
                </div>
            </CardContent>

            <CardFooter className="text-gray-400 text-sm border-t border-gray-800 py-3">
                <time>{feedback.date}</time>
            </CardFooter>
        </Card>
    )
}
