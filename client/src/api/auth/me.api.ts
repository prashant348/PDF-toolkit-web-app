import { apiGet } from "../../libs/api";
import type { User } from "../../schemas/UserSchema";

export async function fetchMe(): Promise<User> {
    // try {
        const res = await apiGet<User>("/auth/me")
        return res
    // } catch (err: any) {
    //     const error = err as ApiError;
    //     console.error("Error fetching user", err);
    //     console.log(error.message);
    //     if (typeof error.message === "object") {
    //         return error.message.message
    //     }
    //     return error.message;
    // }
}