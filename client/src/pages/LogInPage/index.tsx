import { useForm } from "react-hook-form"
import type { LogInFormData } from "../../schemas/LogInSchema";
import { LogInResolver } from "../../schemas/LogInSchema";
import { apiPost } from "../../libs/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../libs/authContext";

interface SuccessResponse {
  success: boolean;
  msg: string
}

export default function LogInPage() {

  const navigate = useNavigate();
  const { refetchUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LogInFormData>({
    resolver: LogInResolver
  });

  const onSubmit = async (data: LogInFormData) => {
    try {
      console.log("form data: ", data)

      const res: SuccessResponse = await apiPost("/auth/login", {
        email: data.email,
        password: data.password
      })

      console.log("res: ", res)

      if (res.success) {
        console.log("navigate to dashboard");
        await refetchUser();
        return navigate("/dashboard")
      }

    } catch (err) {
      console.error("Error logging in: ", err)
    }
  }




  return (
      <div>
        <h1>LogIn page</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* email field */}
          <div>
            <input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {/* if errors occur in email field */}
            {errors.email && (
              <p className="text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* password field */}
          <div>
            <input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {/* if errors occur in password field */}
            {errors.password && (
              <p className="text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* form submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div>
          <p>create account?</p>
          <Link to={"/register"} className="text-blue-500 underline">
            Register
          </Link>
        </div>
      </div>
  )
}
