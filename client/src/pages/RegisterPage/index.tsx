import { useForm } from "react-hook-form"
import type { RegisterFormData } from "../../schemas/RegisterSchema"
import { registerResolver } from "../../schemas/RegisterSchema"
import { apiPost } from "../../libs/api"
import { Link } from "react-router-dom"


export default function RegisterPage() {

  const {
    register, // to register input fields
    handleSubmit, // to handle form submission
    formState: { errors, isSubmitting } // errors and loading state of form
  } = useForm<RegisterFormData>({
    resolver: registerResolver
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log("form data", data)
      const res = await apiPost<RegisterFormData>("/auth/register", {
        email: data.email,
        password: data.password
      })

      console.log("res", res)

    } catch (err) {
      console.error("Error registering user", err)
    }
  }

  return (
    <div>
      <h1>Register</h1>
      {/* handleSubmit of useForm hook will automatically run data validation */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* email field */}
        <div>
          <input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")} // register email field
          />
          {/* if error occurs in email field */}
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
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
          {/* if error occurs in password field */}
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* confirm password field */}
        <div>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          {/* if error occurs in confirmPassword field */}
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
      <div>
        <p>already have an account?</p>
        <Link to={"/auth/login"} className="text-blue-500 underline">
          Log In
        </Link>
      </div>
    </div>
  )
}
