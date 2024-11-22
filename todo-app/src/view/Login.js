import {Link} from "react-router-dom";
import {supabase} from '../supabaseClient'
import { useForm } from "react-hook-form";

export default function Login({onLogin}) {

    const {register, handleSubmit, formState: {errors}} = useForm({mode: "onBlur"});


    const onSubmit = async (data) => {
        //e.preventDefault(); handleSunmit includes this functionality.
        const {email, password} = data;
        const {data: {user}, error} = await supabase.auth.signInWithPassword({
            email, password,
        });
        if(error) {
            alert(`${error.message} ${error.status} ${error.name}`);
            // console.error("LoginErrormessage: ", error);
        } else {
            onLogin(user);
        }
    }
    
    
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Username</label>
                <input type="email" placeholder="Enter ID" {...register("email", {required: "Please enter a valid email address"})}></input>
                {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Enter Password" {...register("password", {required: "Please enter a valid password", minLength: {value: 6, message: "Passwords must be six or more characters"}, pattern: {value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/, message: "Passwords must be one lowercase letter, one uppercase letter, and one digit" } })}></input>
                {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
                <button type="submit">Submit</button>
            </form>
            <p>Already registerd?</p>
            <Link to={"/signup"}>Sign up</Link>
        </div>
        
    )
}