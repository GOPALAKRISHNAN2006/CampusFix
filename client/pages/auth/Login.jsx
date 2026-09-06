import { useState } from "react";
import "./Login.css";
function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log('Email: ',email);
        console.log('Password: ',password)
    };

    return(
        <div className="login-page">
            <div className="login-card">
                <h1>CampusFix</h1>
                <p>Login to yout campusFix Account</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" placeholder="Enter Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="text" placeholder="Enter Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;