import { useAuth } from "../../contexts/authContext"
import { useSearchParams } from "react-router-dom";
import { type SendEmailFormData } from "../../schemas/SendEmailSchema";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const { sendEmailVerificationLink, isSending, emailSendingError, isEmailSent } = useAuth();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email")!;

  const resendEmail = async (data: SendEmailFormData) => {
    console.log("email resend func invoked")
    await sendEmailVerificationLink(data);
  }

  useEffect(() => {
    if (!email) navigate("/login");
  }, [email, navigate])

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-blue-100">
          
          {/* Email Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <svg 
                className="w-10 h-10 text-blue-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
              Check Your Inbox!
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mb-2">
              We've sent a verification link to
            </p>
            <p className="text-blue-600 font-semibold text-sm sm:text-base break-all">
              {email}
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-gray-700 text-sm text-center">
              Please click the link in the email to activate your account.
            </p>
          </div>

          {/* Status Messages */}
          {emailSendingError && !isSending && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-600 text-sm text-center">{emailSendingError}</p>
            </div>
          )}

          {isEmailSent && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-center gap-2">
                <svg 
                  className="w-5 h-5 text-green-600" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <p className="text-green-600 text-sm font-medium">Email sent successfully!</p>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Resend Section */}
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm mb-3">
              Didn't receive the email?
            </p>
            <button 
              onClick={() => resendEmail({ email })} 
              disabled={isSending}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
            >
              {isSending ? "Resending..." : "Resend Verification Email"}
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Already verified?{' '}
              <Link 
                to="/login" 
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            💡 Check your spam folder if you don't see the email
          </p>
        </div>
      </div>
    </div>
  )
}