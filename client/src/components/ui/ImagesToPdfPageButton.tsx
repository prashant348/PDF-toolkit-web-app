import { Link } from "react-router-dom"
export default function ImagesToPdfPageButton() {
    return (
        <Link 
            to="/dashboard/pdf/images-to-pdf"
            className="block bg-white hover:bg-blue-50 border border-blue-200 rounded-xl p-6 transition-all duration-200 shadow-sm hover:shadow-md group"
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Images to PDF</h3>
                    <p className="text-sm text-gray-600">Convert multiple images to a single PDF</p>
                </div>
            </div>
        </Link>
    )
}