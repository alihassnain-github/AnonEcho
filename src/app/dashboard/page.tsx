import FeedbackCard from "@/components/feedback-card"
import LinkCopySection from "@/components/link-copy-section"
import ToggleAcceptMessages from "@/components/toggle-messages"
import WithAuth from "@/hocs/withAuth"

export default function FeedbackDashboard() {

    return (
        <section className="container mx-auto px-4 py-32">
            <WithAuth>
                <LinkCopySection />
            </WithAuth>
            <div className="border-t border-gray-700 my-6"></div>
            <div className="flex flex-wrap md:flex-nowrap gap-4 justify-between items-center mb-4">
                <h2 className="text-xl font-medium text-nowrap">Read your reviews</h2>
                <ToggleAcceptMessages />
            </div>
            <div className="grid md:grid-cols-2 gap-8 relative">
                <FeedbackCard />
            </div>
        </section>
    )
}
