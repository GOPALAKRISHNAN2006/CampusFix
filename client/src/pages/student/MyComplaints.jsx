import { useEffect, useState } from "react";
import { getMyComplaint } from "../../services/complaintServices.js";
import { Link } from "react-router-dom";

import "./MyComplaints.css";
function MyComplaints(){

    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");
    const [complaints,setComplaints] = useState([]);

    useEffect(()=>{

        const fetchComplaints = async()=>{

          try{
            const response = await getMyComplaint();
            console.log(response);
            setComplaints(response.complaint||[]);
          }catch(error){
            console.log(error);
            setError(error?.response?.data?.message || error.message || "Failed to load complaints");
          }finally{
            setLoading(false);
          }
        }
       fetchComplaints();
        
    },[]);

    if(loading){
        return <h2 className="loading">Loading complaints</h2>
    }

    return(
        <div className="my-complaints">
            <div className="page-header">
                <div>
                    <h1>My Complaints</h1>
                    <p>View and Track your submitted complaints</p>
                </div>
                <Link to="/student/complaints/create" className="create-button">
                Submit Complaint</Link>
            </div>
            {error && <p className="error-message">{error}</p>}

            {complaints.length === 0 ?  (
                <div className="empty-state">
                    <h2>No Complaints Found</h2>
                    <p>You can add your first complaint</p>
                    <Link to="/student/complaints/create" className="empty-button" >Submit Complaint</Link>
                </div>
            ):(
                <div className="complaint-list">
                    {complaints.map((complaint)=>(
                        <div className="complaint-card" key={complaint._id}>
                            <div className="complaint-content">
                                <h2>{complaint.title}</h2>
                                <p>{complaint.description}</p>
                                <div className="complaint-details">
                                    <span>Category: {complaint.category}</span>
                                    <span>Priority: {complaint.priority}</span>
                                    <span>Status: {complaint.status}</span>
                                </div>
                            </div>
                            <Link to={`/student/complaints/${complaint._id}`} className="view">
                            View Details</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyComplaints;
