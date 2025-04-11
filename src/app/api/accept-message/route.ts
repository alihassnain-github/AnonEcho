import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth";
import { AcceptMessageSchema } from "@/lib/schemas/messageSchema";
import { UserModel } from "@/models/User";
import connectDB from "@/lib/dbConnect";
import mongoose from "mongoose";

export async function POST(request: Request) {
    await connectDB();
    try {
        const session = await getServerSession(authOptions)

        const user = session?.user;

        if (!session && !user) {
            return Response.json({ message: "Unauthorized access", success: false }, { status: 401 });
        }

        const userId = user?._id;

        const body = await request.json();
        const parsed = AcceptMessageSchema.safeParse(body);
        if (!parsed.success) {
            return Response.json({ message: "Invalid request", success: false }, { status: 400 });
        }

        const { acceptMessage } = parsed.data;

        const updatedUser = await UserModel.findByIdAndUpdate(userId, { acceptMessage }, { new: true });

        if (!updatedUser) {
            return Response.json({ message: "Failed to update user message preference", success: false }, { status: 400 });
        }

        return Response.json({ message: "Message preference updated successfully", success: true }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}

export async function GET() {
    await connectDB();
    try {
        const session = await getServerSession(authOptions)

        const user = session?.user;

        if (!session && !user) {
            return Response.json({ message: "Unauthorized access", success: false }, { status: 401 });
        }

        const userId = new mongoose.Types.ObjectId(user?._id);
        const userData = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: '$messages' },
            { $sort: { '$messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ]);

        const messages = userData[0]?.messages || [];

        console.log("Messages : ", messages);


        return Response.json({ messages, success: true }, { status: 200 });

    } catch (error) {
        return Response.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}