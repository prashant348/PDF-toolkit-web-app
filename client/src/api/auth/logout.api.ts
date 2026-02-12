import { apiPost } from "../../libs/api";
import type { LogOutResponse } from "../../schemas/LogOutSchema";

export async function logOutUser(): Promise<LogOutResponse> {
    const csrfToken = document.cookie.split("=")[1];
    const res = await apiPost<LogOutResponse>("/auth/logout", {}, {
        headers: {
            "x-csrf-token": csrfToken
        }
    })
    return res;
}