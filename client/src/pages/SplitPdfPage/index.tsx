import { useEffect, useRef, useState } from "react"
import { usePDF } from "../../contexts/pdfContext";
import { BackButton } from "../../components/ui/BackButton";
import { pdfRangeSchema } from "../../schemas/pdfRangeSchema";

export default function ImagesToPdfPage() {
    
    const { 
        isSplitting, 
        splitPdf, 
        splittingError, 
        getTotalNumberOfPagesInPdf, 
        isCounting, 
        countingError 
    } = usePDF();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const rangesInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [ ranges, setRanges] = useState<string>("");
    const [validationError, setValidationError] = useState<string | null>(null);
    const [ totalPagesInPdf, setTotalPagesInPdf ] = useState<number | string>(0);

    const handleFilesConversion = async () => {
        if (selectedFiles.length === 0 || !ranges) {
            alert("No files selected or ranges not provided");
            return;
        }
        await splitPdf(selectedFiles[0], ranges);
        setSelectedFiles([]); // Clear after successful download
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            // Add new files to existing ones
            setSelectedFiles([...Array.from(files)]);
        }
    }

    const removeFile = (indexToRemove: number) => {
        setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newRanges = e.target.value;
        setRanges(newRanges);

        const result = pdfRangeSchema.safeParse(newRanges);
        if (!result.success) {
            setValidationError(result.error.issues[0].message);
            return;
        }
        setValidationError(null);
    }

    useEffect(() => {
        const countPages = async () => {            
            if (selectedFiles.length > 0) {
                const totalPages = await getTotalNumberOfPagesInPdf(selectedFiles[0]);
                if (totalPages && !countingError) {
                    setTotalPagesInPdf(totalPages);
                    return;
                }
                setTotalPagesInPdf(countingError || 0);
            } else {
                setTotalPagesInPdf(0);
            }
        }
        countPages();
    }, [selectedFiles])


    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-white">
            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="mb-6">
                    <BackButton />
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-4 mb-2">
                        Split PDF
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Select a PDF and split it into multiple PDFs
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
                        accept=".pdf"
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
                                            PDF selected
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-800 font-semibold">
                                            Total pages in PDF: {isCounting? "..." : totalPagesInPdf}
                                        </p>
                                    </div>
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
                                    Click to select PDF file
                                </p>
                                <p className="text-gray-400 text-xs mt-2">
                                    Supports: PDF
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Error Message */}
                    {splittingError && !isSplitting && (
                        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-red-600 text-sm text-center">{splittingError}</p>
                        </div>
                    )}

                    {/* ranges input */}
                    {selectedFiles.length > 0 && (
                        <div className="w-full mt-2">
                            <label className="block text-gray-700 text-md mb-2">Enter Ranges</label>
                            <input 
                                ref={rangesInputRef}
                                type="text" 
                                placeholder="Example: 1,2-5"
                                onChange={handleChange}
                                className="outline-none rounded-lg p-3  w-full border-2 border-blue-600 focus:bg-blue-50"
                            />
                            {validationError && (
                                <p className="text-red-600 text-sm mt-1">{validationError}</p>
                            )}
                        </div>
                    )}

                    {/* Convert Button */}
                    <button
                        onClick={handleFilesConversion}
                        disabled={isSplitting || selectedFiles.length === 0 || validationError? true: false || ranges.length === 0}
                        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSplitting ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span>Splitting...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span>Split PDF</span>
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
                                <li>• Select the PDF file you want to split</li>
                                <li>• Enter the ranges of pages you want to split</li>
                                <li>• Click "Split PDF" to split and download the zip folder of PDFs</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

