import { z } from "zod";

// Written once, used by both forms
const emailRule = z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address");

const passwordRule = z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters");

export const loginSchema = z.object({
    email: emailRule,
    password: passwordRule,
});

export const registerSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: emailRule,
    password: passwordRule,
});