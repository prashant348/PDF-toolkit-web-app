import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const SendEmailResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
});

export type SendEmailResponse = z.infer<typeof SendEmailResponseSchema>;

const SendEmailSchema = z.object({
    email: z
        .email("Invalid email address")
        .nonempty("Email is required")
        .toLowerCase()
        .trim(),
});

export type SendEmailFormData = z.infer<typeof SendEmailSchema>;
export const SendEmailResolver = zodResolver(SendEmailSchema);
