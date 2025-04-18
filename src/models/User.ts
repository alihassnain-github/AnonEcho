import mongoose from "mongoose";

export interface Message extends mongoose.Document {
    text: string;
    createdAt: Date;
}

export interface User extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    otp: string;
    otpExpiry: Date;
    acceptMessage: boolean;
    messages: Message[];
}

const MessageSchema = new mongoose.Schema<Message>({
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

const UserSchema = new mongoose.Schema<User>({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 8,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
    },
    otpExpiry: {
        type: Date,
    },
    acceptMessage: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema],
});


export const UserModel = mongoose.models?.User || mongoose.model("User", UserSchema);

export const MessageModel = mongoose.models?.Message || mongoose.model("Message", MessageSchema);