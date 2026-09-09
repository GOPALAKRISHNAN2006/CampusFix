import { useState } from "react";
import { createStaff } from "../../services/adminServices";
import { useNavigate } from "react-router-dom";
import "./CreateStaff.css"
function CreateStaff(){

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();
        const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try{
             await createStaff({
                name,email,password,phone
            })
            setSuccess("Staff created successfully")
        }catch(error){
            console.log(error);
            setError(error.response?.data?.message || "Failed to Create Staff");
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="create-page">
            <div className="create-card">
                <h2>Create Staff</h2>
                <p>Create a staff for solving the complaint</p>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Enter Staff Name"
                    value={name} onChange={(e)=>setName(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" placeholder="Enter Staff Email"
                    value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="Enter Staff Password"
                    value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" placeholder="Enter Staff Phone number"
                    value={phone} onChange={(e)=>setPhone(e.target.value)} required/>
                </div>
                <div className="form-actions">
                    <button className="cancel" onClick={()=>navigate("/admin/dashboard")}>Cancel</button>
                    <button className="submit" disabled={loading}>{loading ? "Creating...":"Create" }</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default CreateStaff;