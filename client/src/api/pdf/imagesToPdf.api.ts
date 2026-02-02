import { downloadBlob } from "../../utils/downloadBlob";

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

    if (!res.ok) throw new Error("Error converting files to pdf");
    console.log("res from imageToPdf: ", res);
    const blob = await res.blob();
    console.log("blob: ", blob)
    downloadBlob(blob);
}
