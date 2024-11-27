import { useForm } from "react-hook-form";
import { supabase } from "../supabaseClient";
import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const [isSent, setIssent] = useState(false);

  const onSubmit = async (data) => {
    const { email } = data;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/request-password-reset",
    });
    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      setIssent(true);
    }
  };

  return (
    <div className="loginBody">
      <div className="loginCard">
        <h1>Password Reset Request</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="formLogin">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
          <button type="submit">Send reset mail</button>
          {isSent && (
            <p>A Password reset email has been sent to your email address</p>
          )}

          <p>
            Already have an account? <Link to={"/login"}>Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
