import { downloadBlob } from "../../utils/downloadBlob";
import { type ApiError } from "../../libs/api";
const FASTAPI_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL

export async function splitPdfIntoMultiplePdfs(
    file: File,
    ranges: string
) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("ranges", ranges);
    
    const res = await fetch(`${FASTAPI_BASE_URL}/pdf/split-pdf`, {
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
    console.log("res from splitPdf: ", res);
    const blob = await res.blob();
    console.log("blob: ", blob)
    downloadBlob(blob);
}
