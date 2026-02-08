import { useEffect, useState } from "react"
import { useAuth } from "../../contexts/authContext"
import { useNavigate, useSearchParams } from "react-router-dom";
import type { VerifyEmailFormData } from "../../schemas/VerifyEmailSchema";

export default function ConfirmEmailPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { verifyUserEmail, isVerifying, emailVerificationError, emailVerificationSuccess } = useAuth();
    const token = searchParams.get("token")!;
    const [count, setCount] = useState<number>(5);

    useEffect(() => {
        console.log("useEffect logic runs...")
        if (!token) navigate("/login");
        const emailVerification = async () => {
            await verifyUserEmail({ token } as VerifyEmailFormData);
        };
        emailVerification();
    }, [token]);

    useEffect(() => {
        if (emailVerificationSuccess) {
            const interval = setInterval(() => {
                setCount(prevCount => {
                    const newCount = prevCount - 1;
                    if (newCount === 0) navigate("/login");
                    return newCount;
                });
            }, 1000)
            return () => clearInterval(interval);
        };
    }, [emailVerificationSuccess, count]);

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-white flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                {/* Card Container */}
                <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-blue-100">
                    
                    {/* Verifying State */}
                    {isVerifying && (
                        <div className="text-center">
                            {/* Spinner Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg 
                                        className="w-10 h-10 text-blue-600 animate-spin" 
                                        fill="none" 
                                        viewBox="0 0 24 24"
                                    >
                                        <circle 
                                            className="opacity-25" 
                                            cx="12" 
                                            cy="12" 
                                            r="10" 
                                            stroke="currentColor" 
                                            strokeWidth="4"
                                        />
                                        <path 
                                            className="opacity-75" 
                                            fill="currentColor" 
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                                Verifying Your Email
                            </h1>
                            <p className="text-gray-600 text-sm sm:text-base">
                                Please wait while we confirm your email address...
                            </p>
                        </div>
                    )}

                    {/* Error State */}
                    {emailVerificationError && !isVerifying && (
                        <div className="text-center">
                            {/* Error Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                                    <svg 
                                        className="w-10 h-10 text-red-600" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M6 18L18 6M6 6l12 12" 
                                        />
                                    </svg>
                                </div>
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                                Verification Failed
                            </h1>
                            
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                <p className="text-red-600 text-sm">
                                    {emailVerificationError}
                                </p>
                            </div>

                            <button
                                onClick={() => navigate("/login")}
                                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                            >
                                Go to Login
                            </button>
                        </div>
                    )}

                    {/* Success State */}
                    {emailVerificationSuccess && !isVerifying && (
                        <div className="text-center">
                            {/* Success Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                                    <svg 
                                        className="w-10 h-10 text-green-600" 
                                        fill="currentColor" 
                                        viewBox="0 0 20 20"
                                    >
                                        <path 
                                            fillRule="evenodd" 
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                                            clipRule="evenodd" 
                                        />
                                    </svg>
                                </div>
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                                Email Verified!
                            </h1>
                            
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                <p className="text-green-700 text-sm font-medium mb-2">
                                    Your email has been successfully verified.
                                </p>
                                <p className="text-gray-600 text-sm">
                                    Redirecting to login in{' '}
                                    <span className="font-bold text-blue-600 text-lg">{count}</span>
                                    {' '}seconds...
                                </p>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
                                <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-linear"
                                    style={{ width: `${(count / 5) * 100}%` }}
                                />
                            </div>

                            <button
                                onClick={() => navigate("/login")}
                                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                            >
                                Go to Login Now
                            </button>
                        </div>
                    )}
                </div>

                {/* Help Text */}
                {emailVerificationError && (
                    <div className="mt-6 text-center">
                        <p className="text-gray-500 text-xs">
                            Need help? Contact support or try requesting a new verification email
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}