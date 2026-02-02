import { apiPost } from "../../libs/api";
import type { LogOutResponse } from "../../schemas/LogOutSchema";

export async function logOutUser(): Promise<LogOutResponse> {
    const res = await apiPost<LogOutResponse>("/auth/logout")
    return res;
}