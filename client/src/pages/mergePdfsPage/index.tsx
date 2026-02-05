import {  useRef, useState } from "react"
import { X } from "lucide-react";
import { usePDF } from "../../contexts/pdfContext";
export default function MergePdfsPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const { mergeMultiplePdfs, isMerging, mergingError } = usePDF();

    const handleMerge = async () => {
        if (selectedFiles.length === 0) {
            alert("No files selected");
            return;
        }
        await mergeMultiplePdfs(selectedFiles);
        setSelectedFiles([]); // Clear after successful download
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const files = e.target.files;
        if (files) {
            // Add new files to existing ones
            setSelectedFiles(prev => [...prev, ...Array.from(files)]);
        }
    }

    const handleFileRemove = (fileIndexToRemove: number) => {
        setSelectedFiles(prev => prev.filter((_, index) => index !== fileIndexToRemove));
    }

    const clearAllFiles = () => {
        setSelectedFiles([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }


    return (
        <div>
            <h1>Merge PDFs</h1>
            <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                multiple
                hidden
            />
            <div
                className="upload-box h-50 w-50 border border-dotted flex justify-center items-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
            >
                {selectedFiles.length ? (
                    <ul
                        className="uploaded-files-list h-full w-full flex flex-col gap-1 justify-center items-center overflow-y-auto"
                    >
                        {selectedFiles.map((file, index) => (
                            <li
                                key={index}
                                className="w-full rounded-sm bg-blue-300 p-1 flex justify-between"
                            >
                                <span>{file.name}</span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleFileRemove(index) }}
                                    className="cursor-pointer"
                                >
                                    <X size={18} />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>
                        Upload PDFs
                    </div>
                )}
            </div>
            {mergingError && !isMerging && (
                <p className="text-sm text-red-500">{mergingError}</p>
            )}
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
                    handleMerge();
                }}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                disabled={isMerging}
            >
                {isMerging ? "Merging..." : "Merge PDFs"}
            </button>
        </div>
    )
}