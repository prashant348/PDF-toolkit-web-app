import { useForm } from "react-hook-form"
import { type SendMailFormData, SendMailResolver } from "../../schemas/SendMailSchema";
import { useAuth } from "../../contexts/authContext";
import { useEffect, useState } from "react";

const BASE_COUNT = 60

export default function SendMailPage() {

    const { sendVerificationMail, isSending, isMailSent, sendMailError, setIsMailSent } = useAuth();
    const [count, setCount] = useState<number>(BASE_COUNT);
    const [isCounting, setIsCounting] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SendMailFormData>({
        resolver: SendMailResolver
    });

    const onSubmit = async (data: SendMailFormData) => {
        await sendVerificationMail(data);
    }



    useEffect(() => {
        if (isMailSent) {
            setIsCounting(true);
            const interval = setInterval(() => {
                setCount((prevCount) => prevCount - 1);
                if (count === 0) {
                    setIsCounting(false);
                    setCount(BASE_COUNT);
                    setIsMailSent(false);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isMailSent, count])


    return (
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}

                />
                <div>
                    {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                    )}
                    {isMailSent && !isSending && (
                        <p className="text-green-500">Email sent successfully</p>
                    )}
                    {sendMailError && (
                        <p className="text-red-500">{sendMailError}</p>
                    )}
                </div>
                <div className="text-blue-500 text-sm">
                    {isCounting ? `resend in ${count} seconds` : ""}
                </div>
                <button
                    type="submit"
                    className="border cursor-pointer"
                    disabled={isSending || isCounting}
                    style={{
                        display: isCounting? "none": ""
                    }}
                >
                    {isSending ? "Sending..." : "Send Verification Mail"}
                </button>
            </form>
        </div>
    )
}