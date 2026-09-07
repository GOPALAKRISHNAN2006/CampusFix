import { useState } from "react";
import api from "../../services/api.js";
import "./Register.css";
import { useNavigate } from "react-router-dom";
function Register(){
   const [name,setName] = useState("");
   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");
   const [phone,setPhone] = useState("");
   const [loading,setLoading] = useState(false);
   const [error,setError] = useState("");
   const navigate = useNavigate();
   const handleSubmit = async (e)=>{
      e.preventDefault();
      setLoading(true);
      setError("");
      try{
        const response = await api.post("/auth/register",{
            name,email,password,phone
        })

        console.log(response.data);
        navigate("/login");
      }catch(error){
        console.log(error);
        setError(error?.response?.data?.message || "Registration Failed");
      }finally{
        setLoading(false);
      }
    
   };

   return(
    <div className="register-page">
        <div className="register-card">
            <h1>Register</h1>
            <p>Welcome to CampusFix</p>
            {error && (<p className="error-message">{error}</p>)}
            <form onSubmit={handleSubmit}>
               <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)} required/>
               </div>
               <div className="form-group">
                <label>Email</label>
                <input type="text" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
               </div>
               <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
               </div>
               <div className="form-group">
                <label>Phone</label>
                <input type="text" placeholder="Enter Phonenumber" value={phone} onChange={(e)=>setPhone(e.target.value)} required/>
               </div>
               <button type="submit" disabled={loading}>Register</button>
            </form>
        </div>
    </div>
   );
}

export default Register;
