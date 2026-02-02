import z from "zod";  
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "./UserSchema";

// step 1: define zod schema
const logInSchema = z.object({
    email: z
        .email()
        .nonempty("Email is required")
        .toLowerCase()
        .trim(),

    password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be of atleast 8 characters long")
        .trim()

});

// step 2: define TS type
export type LogInFormData = z.infer<typeof logInSchema>;

// step 3: define zod resolver for loginschema
export const LogInResolver = zodResolver(logInSchema);


const LogInResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(), 
    user: UserSchema,
});

export type LogInResponse = z.infer<typeof LogInResponseSchema>;
