import {Link} from "react-router-dom";
import {useState} from 'react';
import {supabase} from '../supabaseClient'

export default function Login({onLogin}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {data: {user}, error} = await supabase.auth.signInWithPassword({
            email, password,
        });
        if(error) {
            setError(error);
            console.log(error.message, error.status, error.name);
            // console.error("LoginErrormessage: ", error);
        } else {
            onLogin(user);
        }
    }
    
    
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Username</label>
                <input type="email" placeholder="Enter ID" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{color: 'red'}}>{error.message}</p>}
            <p>Already registerd?</p>
            <Link to={"/signup"}>Sign in</Link>
        </div>
        
    )
}