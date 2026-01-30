import { useRef, useState } from "react"

const BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL

export default function ImageToPdfPage() {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileUpload = async () => {
        try {
            const file = fileInputRef.current?.files?.[0];
            console.log("file: ", file)

            const formData = new FormData();
            formData.append("file", file!);

            const res = await fetch(`${BASE_URL}/pdf/image-to-pdf`, {
                method: "POST",
                body: formData,
            })

            console.log("res: ", res)

            if (!res.ok) throw new Error("Error in converting image to pdf")

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `${file?.name}.pdf`;
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Error uploading file: ", err)
        } finally {
            setIsConverting(false);
        }
    }

    return (
        <div>
            <h1>convert image to pdf</h1>
            <input 
                type="file" 
                ref={fileInputRef} 
                hidden
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} 
            />
            <div
                className="file-upload-box flex justify-center items-center h-50 w-50 border cursor-pointer"
                onClick={() => {
                    fileInputRef.current?.click()
                }}
            >
                {selectedFile?.name || "Upload File" }
            </div>
            <button
                onClick={() => {
                    if (!fileInputRef.current?.files?.[0]) {
                        alert("No file choosen")
                        return;
                    }
                    setIsConverting(true);
                    handleFileUpload();
                }}
                className="border cursor-pointer"
                disabled={isConverting}
            >
                {isConverting ? "Converting..." : "Convert"}
            </button>
        </div>
    )
}
