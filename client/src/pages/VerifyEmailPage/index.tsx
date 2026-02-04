import { useAuth } from "../../contexts/authContext"
import { useSearchParams } from "react-router-dom";
import { type SendEmailFormData } from "../../schemas/SendEmailSchema";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const { sendEmailVerificationLink, isSending, emailSendingError, isEmailSent  } = useAuth();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email")!;

  const resendEmail = async (data: SendEmailFormData) => {
    console.log("email resend func invoked")
    await sendEmailVerificationLink(data);
  }

  useEffect(() => {
    if (!email) navigate("/login");
  }, [email])

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>📧 Check your inbox!</h1>
      <p>We've sent a verification link to <strong>{email}</strong>.</p>
      <p>Please click the link in the email to activate your account.</p>
      <hr />
      {(emailSendingError || !isEmailSent) && !isSending && (
        <p className="text-red-500 text-sm">{emailSendingError}</p>
      )}
      {isEmailSent && (
        <p className="text-green-500 text-sm">Email sent successfully!</p>
      )}
      <p>
        Didn't receive it? 
        <button 
          onClick={() => resendEmail({ email })} 
          className="border cursor-pointer"
          disabled={isSending}
        >
            {isSending? "Resending...": "Resend Email"}
        </button>
      </p>
      <hr />
      <p>
        Already verified? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
      </p>
    </div>
  )
}
