import { useForm } from "react-hook-form"
import type { LogInFormData } from "../../schemas/LogInSchema";
import { LogInResolver } from "../../schemas/LogInSchema";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export default function LogInPage() {
  const { logInError, login, isLoggingIn } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LogInFormData>({
    resolver: LogInResolver
  });

  const onSubmit = async (data: LogInFormData) => {
    await login(data);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-500 text-sm">Log in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                } focus:outline-none focus:ring-2 transition-colors`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                } focus:outline-none focus:ring-2 transition-colors`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.password.message}</p>
              )}
            </div>

            {/* Login Error */}
            {logInError && !isLoggingIn && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm text-center">{logInError}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Text (Optional) */}
        <p className="text-center text-gray-500 text-xs mt-6">
          Protected by industry-standard encryption
        </p>
      </div>
    </div>
  )
}