import type { ApiError } from "../../libs/api";
import { apiPost } from "../../libs/api";
import type { LogInResponse } from "../../schemas/LogInSchema";
import type { LogInFormData } from "../../schemas/LogInSchema";

export async function logInUser(
    data: LogInFormData
): Promise<LogInResponse["user"] | string> {

    try {
        const res = await apiPost<LogInResponse>("/auth/login", {
            email: data.email,
            password: data.password
        })

        console.log("res from LogInUser: ", res)
        return res.user
    } catch (err: any) {
        const error = err as ApiError
        console.log("Error logging user: ", err)
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