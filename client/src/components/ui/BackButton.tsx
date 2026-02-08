import { useNavigate } from "react-router-dom"

export function BackButton() {
    const navigate = useNavigate();
    
    return (
        <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-300 transition-colors duration-200 shadow-sm hover:shadow"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="sm:hidden">Back</span>
        </button>
    )
}