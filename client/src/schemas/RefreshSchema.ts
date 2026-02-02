import { z } from "zod";
import { UserSchema } from "./UserSchema";

const RefreshAccessTokenSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    user: UserSchema,
});

export type RefreshAccessToken = z.infer<typeof RefreshAccessTokenSchema>;