import { useRef, useState } from "react"
import { usePDF } from "../../contexts/pdfContext";

export default function ImagesToPdfPage() {
    const { isConverting, convertImagesToPdf } = usePDF();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFilesConversion = async () => {
        try {
            if (selectedFiles.length === 0) {
                alert("No files selected");
                return;
            }
            await convertImagesToPdf(selectedFiles);
            setSelectedFiles([]); // Clear after successful download
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (err) {
            console.error("Error uploading file: ", err)
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            // Add new files to existing ones
            setSelectedFiles(prev => [...prev, ...Array.from(files)]);
        }
    }

    const removeFile = (indexToRemove: number) => {
        setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    }

    const clearAllFiles = () => {
        setSelectedFiles([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    return (
        <div>
            <h1>convert image to pdf</h1>
            <input 
                type="file" 
                ref={fileInputRef} 
                hidden
                onChange={handleFileSelect}
                multiple 
                accept="image/*"
            />
            <div
                className="file-upload-box flex flex-col justify-center items-center h-auto min-h-50 w-full p-4 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:bg-blue-50 transition"
                onClick={() => {
                    fileInputRef.current?.click()
                }}
            >
                {selectedFiles.length > 0 ? (
                    <div className="w-full">
                        <p className="font-semibold mb-3 text-blue-600">Selected files ({selectedFiles.length}):</p>
                        <ul className="space-y-2 max-h-40 overflow-y-auto">
                            {selectedFiles.map((file, index) => (
                                <li key={index} className="flex justify-between items-center text-sm text-gray-700 bg-blue-50 p-2 rounded">
                                    <span>📄 {file.name}</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFile(index);
                                        }}
                                        className="ml-2 text-red-500 hover:text-red-700 font-bold"
                                    >
                                        ✕
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-gray-500 font-medium">No files selected</p>
                        <p className="text-gray-400 text-sm mt-1">Click to select images (select multiple at once)</p>
                    </div>
                )}
            </div>
            {selectedFiles.length > 0 && (
                <button
                    onClick={clearAllFiles}
                    className="mt-2 text-sm text-gray-600 hover:text-gray-800 underline"
                >
                    Clear all
                </button>
            )}

            <button
                onClick={() => {
                    if (selectedFiles.length === 0) {
                        alert("No files selected")
                        return;
                    }
                    handleFilesConversion();
                }}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                disabled={isConverting}
            >
                {isConverting ? "Converting..." : "Convert to PDF"}
            </button>
        </div>
    )
}
