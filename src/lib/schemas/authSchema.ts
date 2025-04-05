import { z } from "zod";

export const SignUpSchema = z.object({
    username: z
        .string()
        .trim()
        .nonempty("Username is required")
        .min(2, "Username must be at least 2 characters long")
        .max(20, "Username cannot exceed 20 characters")
        .regex(/^[a-z0-9](?:[a-z0-9_.-]*[a-z0-9])?$/i, "Invalid username"),

    email: z
        .string()
        .trim()
        .nonempty("Email is required")
        .email("Invalid email format"),

    password: z
        .string()
        .trim()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(12, "Password cannot exceed 12 characters"),
});

export const SignInSchema = z.object({
    email: z
        .string()
        .trim()
        .nonempty("Email is required")
        .email("Invalid email format"),

    password: z
        .string()
        .trim()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(12, "Password cannot exceed 12 characters"),
});

export const VerifySchema = z.object({
    pin: z.string()
        .length(6, { message: "Your one-time password must be exactly 6 digits." })
        .regex(/^\d{6}$/, { message: "OTP must contain only numbers (0-9)." }),
});

export const SendEmailSchema = z.object({
    email: z
        .string()
        .trim()
        .nonempty("Email is required")
        .email("Invalid email format"),
});