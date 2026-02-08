import { useRef, useState } from "react"
import { usePDF } from "../../contexts/pdfContext";
import { BackButton } from "../../components/ui/BackButton";

export default function ImagesToPdfPage() {
    const { isConverting, convertImagesToPdf, convertingError } = usePDF();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFilesConversion = async () => {
        if (selectedFiles.length === 0) {
            alert("No files selected");
            return;
        }
        await convertImagesToPdf(selectedFiles);
        setSelectedFiles([]); // Clear after successful download
        if (fileInputRef.current) fileInputRef.current.value = "";
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
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    const clearAllFiles = () => {
        setSelectedFiles([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-white">
            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="mb-6">
                    <BackButton />
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-4 mb-2">
                        Convert Images to PDF
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Select multiple images and convert them into a single PDF file
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 sm:p-8">

                    {/* Hidden File Input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        hidden
                        onChange={handleFileSelect}
                        multiple
                        accept="image/*"
                    />

                    {/* Upload Area */}
                    <div
                        className="file-upload-box flex flex-col justify-center items-center min-h-50 w-full p-6 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {selectedFiles.length > 0 ? (
                            <div className="w-full" onClick={(e) => e.stopPropagation()}>
                                {/* Files Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <p className="font-semibold text-gray-800">
                                            {selectedFiles.length} {selectedFiles.length === 1 ? 'image' : 'images'} selected
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
                                                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center shrink-0">
                                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <span className="text-gray-700 truncate">{file.name}</span>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeFile(index);
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
                                    + Add More Images
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
                                    Click to select images
                                </p>
                                <p className="text-gray-500 text-sm">
                                    You can select multiple images at once
                                </p>
                                <p className="text-gray-400 text-xs mt-2">
                                    Supports: JPG, PNG, and JPEG
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Error Message */}
                    {convertingError && !isConverting && (
                        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-red-600 text-sm text-center">CE: {convertingError}</p>
                        </div>
                    )}

                    {/* Convert Button */}
                    <button
                        onClick={handleFilesConversion}
                        disabled={isConverting || selectedFiles.length === 0}
                        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isConverting ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span>Converting...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span>Convert to PDF</span>
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
                                <li>• Select one or multiple images from your device</li>
                                <li>• Images will be combined in the order you select them</li>
                                <li>• Click "Convert to PDF" to convert and download your file</li>
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


// import { useRef, useState } from "react"
// import { usePDF } from "../../contexts/pdfContext";
// import { BackButton } from "../../components/BackButton";
// export default function ImagesToPdfPage() {
//     const { isConverting, convertImagesToPdf, convertingError } = usePDF();
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

//     const handleFilesConversion = async () => {
//         if (selectedFiles.length === 0) {
//             alert("No files selected");
//             return;
//         }
//         await convertImagesToPdf(selectedFiles);
//         setSelectedFiles([]); // Clear after successful download
//         if (fileInputRef.current) fileInputRef.current.value = "";

//     }

//     const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const files = e.target.files;
//         if (files) {
//             // Add new files to existing ones
//             setSelectedFiles(prev => [...prev, ...Array.from(files)]);
//         }
//     }

//     const removeFile = (indexToRemove: number) => {
//         setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
//     }

//     const clearAllFiles = () => {
//         setSelectedFiles([]);
//         if (fileInputRef.current) fileInputRef.current.value = "";
//     }

//     return (
//         <div>
//             <BackButton />
//             <h1 className="text-2xl font-bold" >Convert Images To PDF</h1>
//             <input
//                 type="file"
//                 ref={fileInputRef}
//                 hidden
//                 onChange={handleFileSelect}
//                 multiple
//                 accept="image/*"
//             />
//             <div
//                 className="file-upload-box flex flex-col justify-center items-center h-auto min-h-50 w-full p-4 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:bg-blue-50 transition"
//                 onClick={() => {
//                     fileInputRef.current?.click()
//                 }}
//             >
//                 {selectedFiles.length > 0 ? (
//                     <div className="w-full">
//                         <p className="font-semibold mb-3 text-blue-600">Selected files ({selectedFiles.length}):</p>
//                         <ul className="space-y-2 max-h-40 overflow-y-auto">
//                             {selectedFiles.map((file, index) => (
//                                 <li key={index} className="flex justify-between items-center text-sm text-gray-700 bg-blue-50 p-2 rounded">
//                                     <span>📄 {file.name}</span>
//                                     <button
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             removeFile(index);
//                                         }}
//                                         className="ml-2 text-red-500 hover:text-red-700 font-bold"
//                                     >
//                                         ✕
//                                     </button>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 ) : (
//                     <div className="text-center">
//                         <p className="text-gray-500 font-medium">No files selected</p>
//                         <p className="text-gray-400 text-sm mt-1">Click to select images (select multiple at once)</p>
//                     </div>
//                 )}
//             </div>
//             {convertingError && !isConverting && (
//                 <p className="text-sm text-red-500">{convertingError}</p>
//             )}

//             {selectedFiles.length > 0 && (
//                 <button
//                     onClick={clearAllFiles}
//                     className="mt-2 text-sm text-gray-600 hover:text-gray-800 underline"
//                 >
//                     Clear all
//                 </button>
//             )}


//             <button
//                 onClick={() => {
//                     if (selectedFiles.length === 0) {
//                         alert("No files selected")
//                         return;
//                     }
//                     handleFilesConversion();
//                 }}
//                 className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
//                 disabled={isConverting}
//             >
//                 {isConverting ? "Converting..." : "Convert to PDF"}
//             </button>
//         </div>
//     )
// }
