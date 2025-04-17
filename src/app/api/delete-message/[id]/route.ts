import { authOptions } from "@/auth";
import connectDB from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import { getServerSession } from "next-auth";

export async function DELETE(request: Request, {
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params

    await connectDB();
    try {

        const session = await getServerSession(authOptions);
        const user = session?.user;
        if (!session && !user) {
            return Response.json({ message: "Unauthorized access", success: false }, { status: 401 });
        }

        const updatedUser = await UserModel.updateOne(
            { _id: user?._id },
            { $pull: { messages: { _id: id } } }
        )

        if (updatedUser.modifiedCount === 0) {
            return Response.json({ message: "Message not found or already deleted", success: false }, { status: 404 });
        }

        return Response.json({ message: "Message deleted successfully", success: true }, { status: 200 });

    } catch (error) {
        console.error("Error deleting message :", error);
        return Response.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}