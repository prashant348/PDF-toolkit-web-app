import { Link } from "react-router-dom"

export function RegisterButton({ variant = "default" }: { variant?: "default" | "white" }) {
    if (variant === "white") {
        return (
            <Link 
                to="/register"
                className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200 shadow-md"
            >
                Create Free Account
            </Link>
        )
    }

    return (
        <Link 
            to="/register"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span className="hidden sm:inline">Create Account</span>
            <span className="sm:hidden">Sign Up</span>
        </Link>
    )
}