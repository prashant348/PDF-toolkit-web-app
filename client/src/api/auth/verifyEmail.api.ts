import { type ApiError } from "../../libs/api";
import { type VerifyEmailResponse } from "../../schemas/VerifyEmailSchema";
import { apiPost } from "../../libs/api";

export async function verifyEmail(
    token: string
): Promise<VerifyEmailResponse | string> {
    try {
        const res = await apiPost<VerifyEmailResponse>("/auth/verify-email", {
            token: token
        })

        console.log("res from verify email: ", res);

        return res;
    } catch (err: any) {
        const error = err as ApiError;
        console.log("Error verifying email: ", err)
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