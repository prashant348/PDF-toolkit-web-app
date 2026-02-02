import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SendMailSchema = z.object({
    email: z
        .email("Invalid email address")
        .nonempty("Email is required")
        .toLowerCase()
        .trim(),
});

export type SendMailFormData = z.infer<typeof SendMailSchema>;
export const SendMailResolver = zodResolver(SendMailSchema);