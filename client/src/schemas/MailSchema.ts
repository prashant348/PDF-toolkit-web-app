import { z } from "zod";

const SendMailResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
});

export type SendMailResponse = z.infer<typeof SendMailResponseSchema>;