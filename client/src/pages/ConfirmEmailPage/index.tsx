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
    }, [count, emailVerificationSuccess]);

    return (
        <div>
            <h1>Confirm Email Page</h1>
            {isVerifying && (
                <p className="text-sm text-blue-500">Verifying...</p>
            )}
            {emailVerificationError && (
                <p className="text-sm text-red-500">
                    {emailVerificationError}
                </p>
            )}
            {emailVerificationSuccess && (
                <p className="text-green-500">
                    Email Verified! Redirecting to login in {count} seconds.
                </p>
            )}
        </div>
    )
}