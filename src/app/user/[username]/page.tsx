import MessageForm from "@/components/message-form"

export default async function Page({
    params,
}: {
    params: Promise<{ username: string }>
}) {

    const { username } = await params

    return (
        <section className="container mx-auto px-4 py-32">
            <MessageForm username={username} />
        </section>
    )
}
