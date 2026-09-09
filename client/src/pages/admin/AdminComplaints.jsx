import { useState,useEffect } from "react";
import { getAllComplaint } from "../../services/complaintServices";
import { Link } from "react-router-dom";
import "./Admin.css"
function AdminComplaints(){

    const [error,setError] = useState("");
    const [loading,setLoading] = useState(true);
    const [complaints,setComplaints] = useState([]);

    useEffect(()=>{
        const fetchComplaints = async()=>{
             try{
                const data = await getAllComplaint();
                console.log(data);
                setComplaints(data.complaint|| data.complaints || []);
            }catch(error){
                console.log(error);
                setError(error.response?.data?.message || "Failed to Load Complaints");
            }finally{
                setLoading(false);
            }
        }
        fetchComplaints();
    },[])

    if(loading){
        return <h2 className="loading">Loading...</h2>
    }

    return(
        <div className="complaint-page">
            <div className="complaint-header">
                <div>
                    <h3>Complaints</h3>
                    <p>Complaints Details</p>
                </div>
            </div>
           {error && <p className="error-state">{error}</p>}

           {complaints.length === 0 ? (
            <div className="not-found">
                <h2>Not Found</h2>
                <p>No Complaints added</p>
            </div>
           ) : (
            <div className="complaint-list">
                {complaints.map((complaint)=>{
                    return(
                    <div className="complaint-card" key={complaint._id}>
                        <div className="complaint-content">
                            <h2>{complaint.title}</h2>
                            <p>{complaint.description}</p>
                        </div>
                        <div className="complaint-details">
                            <span>Category: {complaint.category}</span>
                            <span>Priority: {complaint.priority}</span>
                            <span>Status: {complaint.status}</span>
                        </div>
                        <Link to={`/admin/complaints/${complaint._id}`} className="view">
                            View Details</Link>
                    </div>
                    
                )})}

            </div>
           )}
        </div>
    )
}

export default AdminComplaints;