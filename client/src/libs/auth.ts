import { apiGet, apiPost } from "./api";

interface SuccessRespone {
    success: boolean,
    user: {
        id: string,
        email: string
    }
}

type User = {
    id: string;
    email: string;
    is_verified: string;
};

export async function fetchMe(): Promise<User> {
    return await apiGet("/auth/me");
}

export async function refreshAccessToken() {
    const res: SuccessRespone = await apiPost("/auth/refresh")
    console.log("Res: ", res)
    return res
}