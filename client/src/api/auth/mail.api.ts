import { apiPost } from "../../libs/api";
import type { ApiError } from "../../libs/api";
import type { SendMailResponse } from "../../schemas/MailSchema";


export default async function sendMail(
    email: string
): Promise<SendMailResponse | string> {
    try {
        const res = await apiPost<SendMailResponse>("/auth/send-mail", {
            email: email
        });
        console.log("res from sendMail: ", res)
        return res;
    } catch (err: any) {
        const error = err as ApiError;
        console.log("Error sending mail: ", err)
        console.log(error.message);
        if (typeof error.message === "object") {
            return error.message.message
        } 
        return error.message;
    }
}