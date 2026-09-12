import { useState } from "react";
import { createComplaint } from "../../services/complaintServices";
import { useNavigate } from "react-router-dom";
import "./CreateComplaint.css";
function CreateComplaint(){

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [priority,setPriority] = useState("medium");
    const [category,setCategory] = useState("");

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError("");

        try{
            await createComplaint({
                title,description,priority,category
            })

            navigate("/student/complaints");
        }catch(error){
            console.log(error);
            setError(error.response?.data?.message || "Failed to Create Complaint")
        }finally{
            setLoading(false);
        }
    };


    return(
        <div className="create-complaint-page">
            <div className="create-complaint-card">
                <h1>Submit Complaint</h1>
                <p>Report an Issue on your campus</p>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" placeholder="Enter Complaint Name" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea placeholder="Enter description about the complaint" value={description} onChange={(e)=>setDescription(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select value={category} onChange={(e)=>setCategory(e.target.value)} required>
                        <option value="">Select Category</option>
                        <option value="Cleaning">Cleaning</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Priority</label>
                    <select value={priority} onChange={(e)=>setPriority(e.target.value)} required>
                        <option value="">Select Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                    </select>
                </div>
                <div className="form-action">
                    <button type="button" className="cancel" onClick={()=>navigate("/student/complaints")}>Cancel</button>
                   <button type="submit" className="submit" disabled={loading}>{loading ? "Submitting":"Submit"}</button>
                </div> 
            </form>
          </div>  
        </div>
    )

}

export default CreateComplaint;
