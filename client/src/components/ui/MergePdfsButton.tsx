import { Link } from "react-router-dom"

export function MergePdfsButton() {
    return (
        <Link 
            to="/dashboard/pdf/merge-pdfs"
            className="block bg-white hover:bg-blue-50 border border-blue-200 rounded-xl p-6 transition-all duration-200 shadow-sm hover:shadow-md group"
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Merge PDFs</h3>
                    <p className="text-sm text-gray-600">Combine multiple PDF files</p>
                </div>
            </div>
        </Link>
    )
}