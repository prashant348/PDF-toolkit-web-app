import { z } from "zod";

export const UserSchema = z.object({
    id: z.string(),
    email: z.string(),  
    is_verified: z.boolean(),
})

export type User = z.infer<typeof UserSchema>;