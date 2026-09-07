import { useState } from "react";
import api from "../../services/api.js";
import "./Login.css";
import { useNavigate } from "react-router-dom";
function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        setError("");
        
     try{
        const response = await api.post("/auth/login",{
            email,password
        });

        console.log(response.data);

        const {token,user} = response.data;
        localStorage.setItem("token" ,token);
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/student/dashboard";
      }
      catch(error){
        console.log(error);
        setError(error.response?.data?.message || "Login Failed");
      }
      finally{
        setLoading(false);
      }
    };

    return(
        <div className="login-page">
            <div className="login-card">
                <h1>CampusFix</h1>
                <p>Login to yout campusFix Account</p>
                {error && (<p className="error-message">{error}</p>)}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" placeholder="Enter Email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter Password" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
                    </div>
                    <button type="submit" disabled={loading}>{loading?"Logging In...":"Login"}</button>
                </form>
            </div>
        </div>
    );
}

export default Login;