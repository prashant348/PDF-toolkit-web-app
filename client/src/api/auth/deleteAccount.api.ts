import { apiDel } from "../../libs/api";

export async function deleteUserAccount() {
    const res = await apiDel("/auth/delete-account")
    return res;
}