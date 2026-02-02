import { z } from "zod";

const LogOutSchema = z.object({
    success: z.boolean(),
    message: z.string(),
});

export type LogOutResponse = z.infer<typeof LogOutSchema>;