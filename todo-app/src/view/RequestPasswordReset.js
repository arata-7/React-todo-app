import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Link, useNavigate } from "react-router-dom";

export default function RequestPasswordReset() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          setSession(session);
          setLoading(false);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const onSubmit = async (data) => {
    const { password } = data;
    if (!session) {
      alert("Session not found. Please try again.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      alert("Password has been updated successfully.");
      navigate("/login");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Update Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="New Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters lomg",
            },
            Pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/,
              message:
                "Password must include one uppercase letter, one lowercase letter, and one number",
            },
          })}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}
