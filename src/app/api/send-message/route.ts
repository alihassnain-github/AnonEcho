import connectDB from "@/lib/dbConnect";
import { MessageSchema } from "@/lib/schemas/messageSchema";
import { UserModel } from "@/models/User";

export async function POST(request: Request) {
    await connectDB();
    try {

        const body = await request.json();
        const parsed = MessageSchema.safeParse(body);
        if (!parsed.success) {
            return Response.json({ message: "Invalid request", success: false }, { status: 400 });
        }

        const { username, text } = parsed.data;

        const user = await UserModel.findOne({ username });
        if (!user) {
            return Response.json({ message: "User not found", success: false }, { status: 404 });
        }

        if (!user.acceptMessage) {
            return Response.json({ message: "No longer accepting messages", success: false }, { status: 403 });
        }

        const message = {
            text,
            createdAt: new Date()
        };

        user.messages.push(message);
        await user.save();
        return Response.json({ message: "messages sent successfully", success: true }, { status: 200 });

    } catch (error) {
        return Response.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}