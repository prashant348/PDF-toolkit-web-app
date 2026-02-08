export default function AuthLoader() {
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-white flex items-center justify-center px-4">
            <div className="text-center">
                
                {/* Animated Logo/Icon Container */}
                <div className="relative mb-8">
                    {/* Outer Ring - Spinning */}
                    <div className="w-24 h-24 mx-auto relative">
                        <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
                        
                        {/* Inner Circle with Icon */}
                        <div className="absolute inset-2 bg-white rounded-full shadow-lg flex items-center justify-center">
                            <svg 
                                className="w-10 h-10 text-blue-600 animate-pulse" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Loading Text */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Loading
                </h2>
                
                {/* Animated Dots */}
                <div className="flex items-center justify-center gap-1 mb-4">
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>

                {/* Subtext */}
                <p className="text-gray-500 text-sm">
                    Please wait while we authenticate...
                </p>
            </div>
        </div>
    )
}