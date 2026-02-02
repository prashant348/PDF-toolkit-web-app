import { useForm } from "react-hook-form"
import { type SendMailFormData, SendMailResolver } from "../../schemas/SendMailSchema";
import { useAuth } from "../../contexts/authContext";

export default function SendMailPage() {

    const { sendVerificationMail, isSending, isMailSent, sendMailError } = useAuth();

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
                <button 
                    type="submit"
                    className="border cursor-pointer"
                    disabled={isSending}
                >
                    {isSending ? "Sending..." : "Send Verification Mail"}
                </button>
            </form>
        </div>
    )
}