import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const VerifyEmailResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
});

export type VerifyEmailResponse = z.infer<typeof VerifyEmailResponseSchema>;

const VerifyEmailSchema = z.object({
    token: z
        .string()
        .nonempty("Token is required")
        .trim(),
});

export type VerifyEmailFormData = z.infer<typeof VerifyEmailSchema>;
export const VerifyEmailResolver = zodResolver(VerifyEmailSchema);