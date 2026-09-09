import { Link, useParams } from "react-router-dom";
import { getComplaintById } from "../../services/adminServices";
import { useState,useEffect } from "react";
import "./Admin.css"
function AdminComplaintsDetails(){

    const {id} = useParams();
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(true);
    const [complaint, setComplaint] = useState(null);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            throw new Error("No Authentication Found");
        }

        const fetchComplaint = async(id)=>{
            try{
                const data = await getComplaintById(id);
                console.log(data);
                setComplaint(data.complaint);
            }catch(error){
                console.log(error);
                setError(error.response?.data?.message || "Error while Fetching Complaint");
            }finally{
                setLoading(false);
            }
        }
        fetchComplaint(id);
    },[id])

    if(loading){
        return <h2 className="loading">Loading...</h2>
    }

    if(error){
         <div className="details-page">
            <p className="error-message">{error}</p>
            <Link to="/student/complaints">Back to Complaints</Link>
        </div>
    }

    if(!complaint){
        return (
            <div className="details-page">
                <h2>Not Found</h2>
                <Link to="/admin/complaints" className="back-btn">Back to Complaints</Link>
            </div>
        )
    }
    return(
       <div className="details-page">
        <div className="details-header">
            <div>
                <h1>Complaints Details</h1>
                <p>View th complete complaint information.</p>
            </div>
            <Link to="/admin/complaints" className="back-btn">Back</Link>
        </div>
        <div className="details-card">
            <h2>{complaint.title}</h2>
            <div className="detail-item">
                <strong>Description</strong>
                <p>{complaint.description}</p>
            </div>
            <div className="detail-row">
                <div className="detail-item">
                    <strong>Category</strong>
                    <p>{complaint.category}</p>
                </div>
                <div className="detail-item">
                    <strong>Prority</strong>
                    <p>{complaint.priority}</p>
                </div>
                <div className="detail-item">
                    <strong>Status</strong>
                    <p>{complaint.status}</p>
                </div>
            </div>
            <div className="detail-item">
                <strong>Submitted On</strong>
                <p>{new Date(complaint.createdAt).toLocaleString()}</p>
            </div>
            <div className="detail-item">
                <strong>Assigned Staff</strong>
                <p>{complaint.assignedStaff?.name || "Not Assigned Yet"}</p>
            </div>
            <div className="detail-item">
                <strong>Student</strong>
                <p>{complaint.student?.name || "Not Assigned Yet"}</p>
            </div>
            <div className="detail-item">
                <strong>Resolution</strong>
                <p>{complaint.resolution || "No Resolution Added yet"}</p>
            </div>

        </div>
    </div>
    )

}

export default AdminComplaintsDetails;