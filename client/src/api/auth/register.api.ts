import { type RegisterFormData } from "../../schemas/RegisterSchema";
import { apiPost } from "../../libs/api";
import { type RegisterResponse } from "../../schemas/RegisterSchema";
import { type ApiError } from "../../libs/api";

export default async function registerUser(
    data: RegisterFormData
): Promise<RegisterResponse["user"] | string> {
    try {
        const res = await apiPost<RegisterResponse>("/auth/register", {
            email: data.email,
            password: data.password
        });

        console.log("res from registerUser: ", res);

        return res.user;

    } catch (err: any) {
        const error = err as ApiError;
        console.error("Error registering user", err);
        console.log(error.message);
        if (error.status < 500) {
            if (typeof error.message === "object") {
                return error.message.message
            }
            return error.message;
        }
        return "Something went wrong";
    }
}