import { apiPost } from "../../libs/api";
import type { ApiError } from "../../libs/api";
import type { SendEmailResponse } from "../../schemas/SendEmailSchema";


export async function sendEmail(
    email: string
): Promise<SendEmailResponse | string> {
    try {
        const res = await apiPost<SendEmailResponse>("/auth/send-email", {
            email: email
        });
        console.log("res from sendMail: ", res)
        return res;
    } catch (err: any) {
        const error = err as ApiError;
        console.log("Error sending email: ", err)
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
