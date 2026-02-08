import { useRef, useState } from "react"
import { usePDF } from "../../contexts/pdfContext";
import { BackButton } from "../../components/ui/BackButton";

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
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    const clearAllFiles = () => {
        setSelectedFiles([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    // useEffect(() => {
    //     console.log("len changed!")
    //     if (!selectedFiles.length) {
    //         fileInputRef.current!.value = "";
    //     }
    // }, [selectedFiles.length])

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-white">
            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="mb-6">
                    <BackButton />
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-4 mb-2">
                        Merge Multiple PDFs
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Combine multiple PDF files into a single document
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 sm:p-8">
                    
                    {/* Hidden File Input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileSelect}
                        multiple
                        accept=".pdf"
                        hidden
                    />

                    {/* Upload Area */}
                    <div
                        className="upload-box flex flex-col justify-center items-center min-h-50 w-full p-6 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {selectedFiles.length > 0 ? (
                            <div className="w-full" onClick={(e) => e.stopPropagation()}>
                                {/* Files Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <p className="font-semibold text-gray-800">
                                            {selectedFiles.length} {selectedFiles.length === 1 ? 'PDF' : 'PDFs'} selected
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            clearAllFiles();
                                        }}
                                        className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline transition-colors"
                                    >
                                        Clear all
                                    </button>
                                </div>

                                {/* Files List */}
                                <ul className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                    {selectedFiles.map((file, index) => (
                                        <li 
                                            key={index} 
                                            className="flex justify-between items-center text-sm bg-gray-50 hover:bg-gray-100 p-3 rounded-lg border border-gray-200 transition-colors group"
                                        >
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                {/* PDF Icon */}
                                                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center shrink-0">
                                                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                {/* Order Badge */}
                                                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                                                    {index + 1}
                                                </div>
                                                <span className="text-gray-700 truncate">{file.name}</span>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleFileRemove(index);
                                                }}
                                                className="ml-3 w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors shrink-0"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                {/* Add More Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        fileInputRef.current?.click();
                                    }}
                                    className="mt-4 w-full py-2 px-4 border-2 border-dashed border-blue-300 hover:border-blue-500 text-blue-600 hover:text-blue-700 rounded-lg font-medium transition-colors"
                                >
                                    + Add More PDFs
                                </button>
                            </div>
                        ) : (
                            <div className="text-center">
                                {/* Upload Icon */}
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-gray-700 font-semibold mb-2 text-lg">
                                    Click to select PDFs
                                </p>
                                <p className="text-gray-500 text-sm">
                                    You can select multiple PDF files at once
                                </p>
                                <p className="text-gray-400 text-xs mt-2">
                                    Files will be merged in the order you select them
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Error Message */}
                    {mergingError && !isMerging && (
                        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-red-600 text-sm text-center">{mergingError}</p>
                        </div>
                    )}

                    {/* Merge Button */}
                    <button
                        onClick={handleMerge}
                        disabled={isMerging || selectedFiles.length === 0 || selectedFiles.length === 1}
                        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isMerging ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span>Merging PDFs...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                </svg>
                                <span>Merge PDFs</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Info Section */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <h3 className="text-blue-800 font-semibold text-sm mb-1">How it works</h3>
                            <ul className="text-blue-700 text-xs space-y-1">
                                <li>• Select two or more PDF files from your device</li>
                                <li>• PDFs will be merged in the order shown (numbered badges)</li>
                                <li>• Drag files to reorder is not supported yet - select in desired order</li>
                                <li>• Click "Merge PDFs" to merge and download the merged file</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Scrollbar Style */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>
        </div>
    )
}