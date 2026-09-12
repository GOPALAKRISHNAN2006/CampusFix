import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getComplaintsById } from "../services/staffServices";
function StaffComplaintsDetails(){
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");
    const [complaint,setComplaint] = useState();
    const {id} = useParams();
    useEffect(()=>{
        const fetComplaint = async()=>{
            try{
                const response = await getComplaintsById(id);
                console.log(response);
                setComplaint(response.complaint);
            }catch(error){
                setError(error.response?.data?.message);
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        fetComplaint();
    },[id]);

    if(loading){
        return <h2 className="loading">Loading</h2>
    }

    if(!complaint){
        return(
        <div className="empty-state">
            <div className="complaint-details">
                <h2>Not Found</h2>
                <p>No Complaints Found</p>
            </div>
            <Link className="back-btn">Back</Link>
        </div>
        )
    }
    return(
    <div className="details-page">
        <div className="details-header">
            <div>
                <h1>Complaints Details</h1>
                <p>View the complete complaint information.</p>
            </div>
            <Link to="/staff/complaints" className="back-btn">Back</Link>
        </div>
        <div className="details-card">
            <strong>Title</strong>
            <p>{complaint.title}</p>
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
                <strong>Student</strong>
                <p>Name:{complaint.student?.name || "Not Assigned Yet"}</p>
                <p>Email:{complaint.student?.email}</p>
            </div>
            <div className="detail-item">
                <strong>Assigned Staff</strong>
                <p>{complaint.assignedStaff?.name || "Not Assigned Yet"}</p>
            </div>
            <div className="detail-item">
                <strong>Resolution</strong>
                <p>{complaint.resolution || "No Resolution Added yet"}</p>
            </div>
        </div>
    </div>
   )
}

export default StaffComplaintsDetails;