import { apiDel } from "../../libs/api";

export async function deleteUserAccount() {
    const csrfToken = document.cookie.split("=")[1];
    const res = await apiDel("/auth/delete-account", {}, {
        headers: {
            "x-csrf-token": csrfToken
        }
    })
    return res;
}