import FeedbackCard from "@/components/feedback-card"
import LinkCopySection from "@/components/link-copy-section"
import ToggleAcceptMessages from "@/components/toggle-messages"
import { Button } from "@/components/ui/button"
import WithAuth from "@/hocs/withAuth"
import { RefreshCcw } from "lucide-react"

const feedbacks = [
    {
        id: 1,
        text: "The team meeting format has improved dramatically since we started collecting anonymous feedback. People are more honest now",
        type: "Questions",
        rating: 5,
        date: "Apr 9, 2025 8:05 AM",
    },
    {
        id: 2,
        text: "The team meeting format has improved dramatically since we started collecting anonymous feedback. People are more honest now",
        type: "Questions",
        rating: 5,
        date: "Apr 9, 2025 8:05 AM",
    },
    {
        id: 3,
        text: "The team meeting format has improved dramatically since we started collecting anonymous feedback. People are more honest now",
        type: "Questions",
        rating: 5,
        date: "Apr 9, 2025 8:05 AM",
    },
    {
        id: 4,
        text: "The team meeting format has improved dramatically since we started collecting anonymous feedback. People are more honest now",
        type: "Questions",
        rating: 5,
        date: "Apr 9, 2025 8:05 AM",
    },
]

export default function FeedbackDashboard() {

    return (
        <section className="container mx-auto px-4 py-32">
            <WithAuth>
                <LinkCopySection />
            </WithAuth>
            <div className="border-t border-gray-700 my-6"></div>
            <div className="flex flex-wrap md:flex-nowrap gap-4 justify-between items-center mb-4">
                <h2 className="text-xl font-medium text-nowrap">Read your reviews</h2>
                <div className="flex items-center justify-between md:justify-end w-full gap-x-8">
                    <ToggleAcceptMessages />
                    <Button size={"icon"}>
                        <RefreshCcw size={18} />
                    </Button>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                {feedbacks.map((feedback) => (
                    <FeedbackCard key={feedback.id} />
                ))}
            </div>
        </section>
    )
}
