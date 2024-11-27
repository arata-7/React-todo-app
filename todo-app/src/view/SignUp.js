import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useForm } from "react-hook-form";
import "./Login.css";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;
    console.log(password);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      alert(`${error.message} ${error.status} ${error.name}`);
    } else {
      alert("We have sent a confirmation email");
      navigate("/login");
    }
  };

  return (
    <div className="loginBody">
      <div className="loginCard">
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="formLogin">
          <label htmlFor="email">Username</label>
          <input
            type="email"
            placeholder="Enter ID"
            {...register("email", {
              required: "Please enter a valid email address",
            })}
          ></input>
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            {...register("password", {
              required: "Please enter a valid password",
              minLength: {
                value: 6,
                message: "Passwords must be six or more characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/,
                message:
                  "Passwords must be one lowercase letter, one uppercase letter, and one digit",
              },
            })}
          ></input>
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
          <button type="submit">Register</button>
        </form>
        <br />
        <p>
          Already have an account? <Link to={"/login"}>Login here</Link>
        </p>
      </div>
    </div>
  );
}
