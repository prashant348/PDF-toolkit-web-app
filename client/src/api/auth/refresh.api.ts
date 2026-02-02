import { apiPost } from "../../libs/api";
import { type RefreshAccessToken } from "../../schemas/RefreshSchema";

export async function refreshAccessToken(): Promise<RefreshAccessToken["user"]> {
    // try {
        const res = await apiPost<RefreshAccessToken>("/auth/refresh");
        console.log("res from refreshAccessToken: ", res);
        return res.user
    // } catch (err: any) {
    //     const error = err as ApiError;
    //     console.error("Error refreshing access_token", err);
    //     console.log(error.message);
    //     if (typeof error.message === "object") {
    //         return error.message.message;
    //     }
    //     return error.message;
    // }
}