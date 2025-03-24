import mongoose from "mongoose";

type connectionObj = {
    isConnected?: number,
}

const connection: connectionObj = {};

export default async function connectDB(): Promise<void> {
    if (connection.isConnected) {
        return
    }

    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
        throw new Error(
            "Please define the MONGODB_URI environment variable inside .env.local",
        );
    }
    try {
        const connect = await mongoose.connect(MONGODB_URI);
        connection.isConnected = connect.connections[0].readyState;
    } catch (error) {
        throw error
    }
}