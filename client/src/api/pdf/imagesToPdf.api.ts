import { downloadBlob } from "../../utils/downloadBlob";
import { type ApiError } from "../../libs/api";
const FASTAPI_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL

export async function imagesToPdf(
    files: File[]
) {
    const formData = new FormData();
    files.forEach(file => {
        formData.append("files", file);
    });
    const res = await fetch(`${FASTAPI_BASE_URL}/pdf/images-to-pdf`, {
        method: "POST",
        body: formData
    })

    if (!res.ok) {
        const data: object | string = await res.json().catch(async () => {
            const txt = await res.text();
            return txt;
        })
        throw {
            status: res.status,
            message: data,
        } as ApiError;
    }
    console.log("res from imageToPdf: ", res);
    const blob = await res.blob();
    console.log("blob: ", blob)
    downloadBlob(blob);
}
