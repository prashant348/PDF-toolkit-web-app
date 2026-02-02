import { apiPost } from "../../libs/api";
import type { ApiError } from "../../libs/api";
import type { SendMailResponse } from "../../schemas/MailSchema";


export default async function sendMail(
    email: string
): Promise<void> {
    try {
        const res = await apiPost<SendMailResponse>("/auth/send-mail", { email: email });
        console.log("res from sendMail: ", res)
    } catch (err: any) {
        const error = err as ApiError;
        console.log(error.message);
    }
}