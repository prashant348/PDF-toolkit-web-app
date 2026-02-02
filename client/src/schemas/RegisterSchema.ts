import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "./UserSchema";

// STEP 1: Define zod schema: zod schema defines data validation rules
const registerSchema = z.object({
    email: z
        .email("Invalid email address")
        .nonempty("Email is required")
        .toLowerCase()
        .trim()
        ,

    password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be of atleast 8 characters long")
        .trim()
        ,
    
    confirmPassword: z
        .string()
        .nonempty("Confirm Password is required")
        .trim()

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // On which field to display the error
});

// STEP 2: TS type - type generate from schema automatically
export type RegisterFormData = z.infer<typeof registerSchema>;

// STEP 3: Create resolver
export const registerResolver = zodResolver(registerSchema);


const RegisterResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    user: UserSchema 
});

export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
