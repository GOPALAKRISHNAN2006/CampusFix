import { useEffect, useState } from "react";
import { closeComplaint,getMyComplaintById } from "../../services/complaintServices";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ComplaintDetails.css"
function ComplaintsDetails(){
    const {id} = useParams();
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(true);
    const [complaint,setComplaint] = useState(null);

    const [closing,setClosing] = useState("");
    const [closeError,setCloseError] = useState("");

    const handleCloseComplaint = async()=>{
        setClosing(true);
        setCloseError("");

        try{
            await closeComplaint(id);
            const data = await getMyComplaintById(id);
            setComplaint(data.complaint||[]);
        }catch(error){
            console.log(error);
            setCloseError(error.response?.data?.message || "Falied to close complaint");
        }finally{
            setClosing(false);
        }
    }

   useEffect(()=>{
    const fetchComplaint = async()=>{
        try{
            const data = await getMyComplaintById(id);
            console.log("DETAIL RESPONSE:", data);
            setComplaint(data.complaint);
        }catch(error){
            console.log(error);
            setError(error.response?.data?.message || "Failed to load complaints");
        }finally{
            setLoading(false);
        }
    }
    fetchComplaint();
   },[id]);

   if(loading){
     return <h2 className="loading">Loading...</h2>
   }

   if(error){
    return (
        <div className="details-page">
            <p className="error-message">{error}</p>
            <Link to="/student/complaints">Back to Complaints</Link>
        </div>
    );
   }

   if(!complaint){
      return (
        <div className="details-page">
            <h2>Complaints not Found</h2>
            <Link to="/student/complaints" className="back-btn">Back to Complaints</Link>
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
            <Link to="/student/complaints" className="back-btn">Back</Link>
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
                <strong>Assigned Staff</strong>
                <p>{complaint.assignedStaff?.name || "Not Assigned Yet"}</p>
            </div>
            <div className="detail-item">
                <strong>Resolution</strong>
                <p>{complaint.resolution || "No Resolution Added yet"}</p>
            </div>

            {complaint.status !== "closed" && (
                <div className="close-section">
                    {closeError && (
                        <p className="error-message">{closeError}</p>
                    )}
                 <button className="close-button" onClick={handleCloseComplaint} disabled={closing}> {closing ? "Closing..." : "Close Complaint"}</button>   
                </div>
            )}
        </div>
    </div>
   )
}

export default ComplaintsDetails;
