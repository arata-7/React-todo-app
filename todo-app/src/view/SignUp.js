import {Link} from "react-router-dom";

export default function SignUp() {
    return (
        <div>
            <h1>Register</h1>
            <form>
                <label htmlFor="email">Username</label>
                <input type="email" placeholder="Enter ID"></input>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Enter Password"></input>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account?</p>
            <Link to={"/login"}>Login here</Link>
            
        </div>
        
    )
}