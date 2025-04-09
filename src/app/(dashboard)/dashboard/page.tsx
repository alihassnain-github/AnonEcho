import FeedbackCard from "@/components/feedback-card"
import LinkCopySection from "@/components/link-copy-section"
import { RefreshCcw } from "lucide-react"

const feedbacks = [
    {
        id: 1,
        text: "The team meeting format has improved dramatically since we started collecting anonymous feedback. People are more honest now",
        type: "Questions",
        rating: 5,
        date: "Apr 9, 2025 8:05 AM",
    },
]

export default function FeedbackDashboard() {

    return (
        <div className="max-w-4xl mx-auto">
            <LinkCopySection />
            <div className="border-t border-gray-700 my-6"></div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Read your reviews</h2>
                <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                    <RefreshCcw size={18} />
                </button>
            </div>

            <div className="space-y-4">
                {feedbacks.map((feedback) => (
                    <FeedbackCard key={feedback.id} feedback={feedback}/>
                ))}
            </div>
        </div>
    )
}
