import { Link } from "react-router-dom"

export function SplitPdfButton() {
    return (
        <Link 
            to="/dashboard/pdf/split-pdf"
            className="block bg-white hover:bg-blue-50 border border-blue-200 rounded-xl p-6 transition-all duration-200 shadow-sm hover:shadow-md group"
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    {/* Scissors cutting through document - Perfect for "Split" */}
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Split PDF</h3>
                    <p className="text-sm text-gray-600">Split a PDF into multiple PDFs</p>
                </div>
            </div>
        </Link>
    )
}