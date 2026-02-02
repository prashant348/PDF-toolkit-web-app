import { useForm } from "react-hook-form"
import type { LogInFormData } from "../../schemas/LogInSchema";
import { LogInResolver } from "../../schemas/LogInSchema";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { useEffect } from "react";

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

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError])

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
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Log In"}
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
