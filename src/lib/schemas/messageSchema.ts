import { z } from "zod";

export const MessageSchema = z.object({
    text: z.
        string()
        .trim()
        .nonempty("Message is required")
        .min(10, "Message must be at least 10 characters long")
});

export const AcceptMessageSchema = z.object({
    acceptMessage: z.
        boolean(),
});