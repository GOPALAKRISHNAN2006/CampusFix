import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getComplaintsById,startWorking,Resolve,Resolution } from "../../services/staffServices";
import "./StaffComplaintsDetails.css";

function StaffComplaintsDetails(){
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");
    const [complaint,setComplaint] = useState(null);
    const {id} = useParams();

    const [startError, setStartError] = useState("");
    const [startLoading, setStartLoading] = useState(false);
    const [resolveError, setResolveError] = useState("");
    const [resolveLoading, setResolveLoading] = useState(false);

    const [resolution,setResolution] = useState("")
    const [resolutionError, setResolutionError] = useState("");
    const [resolutionLoading,setResolutionLoading] = useState(false);
    const [resolutionSuccess,setResolutionSuccess] = useState(false);

        const handleStartWork = async()=>{

            setStartError("");
            setStartLoading(true);
            try{
                await startWorking(id);
                const response = await getComplaintsById(id);
                setComplaint(response.complaint);
            }catch(error){
                console.log(error);
                setStartError(error.response?.data?.message);
            }finally{
                setStartLoading(false);
            }
        }
    
    

        const handleResolveWork = async()=>{

            setResolveError("");
            setResolveLoading(true);
            try{
                await Resolve(id);
                const response = await getComplaintsById(id);
                setComplaint(response.complaint);
            }catch(error){
                console.log(error);
                setResolveError(error.response?.data?.message);
            }finally{
                setResolveLoading(false);
            }
        }

        const handleResolution = async(e)=>{
            e.preventDefault();
            setResolutionError("");
            setResolutionLoading(true);

            try{
                await Resolution(id,resolution);
                const data = await getComplaintsById(id);
                setComplaint(data.complaint);
                setResolutionSuccess("Resolution Added Successfully!");
                console.log(data);
            }catch(error){
                console.log(error);
                setResolutionError(error.response?.data?.message);
            }finally{
                setResolutionLoading(false);
            }
        }

    useEffect(()=>{
        const fetchComplaint = async()=>{
            try{
                const response = await getComplaintsById(id);
                console.log(response);
                setComplaint(response.complaint);
            }catch(error){
                setError(error.response?.data?.message || error.message || "Failed to load complaint details");
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        fetchComplaint();
    },[id]);

    if(loading){
        return <h2 className="loading">Loading...</h2>;
    }

    if(error){
        return(
            <div className="details-page">
                <p className="error-message">{error}</p>
                <Link to="/staff/complaints" className="back-btn">Back to Complaints</Link>
            </div>
        );
    }

    if(!complaint){
        return(
            <div className="empty-state">
                <div className="complaint-details">
                    <h2>Not Found</h2>
                    <p>No Complaints Found</p>
                </div>
                <Link to="/staff/complaints" className="back-btn">Back</Link>
            </div>
        );
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

                {complaint.status === "assigned" && (
                  <div className="start">
                    {startError && <p className="error-message">{startError}</p>}
                    <button className="start-button" onClick={handleStartWork} disabled={startLoading}>{startLoading ? "Start Working..." : "Start Work"}</button>
                  </div>
                )}
                {complaint.status === "in-progress" && (
                  <div className="resolve">
                    {resolveError && <p className="error-message">{resolveError}</p>}
                    <button className="resolve-button" onClick={handleResolveWork} disabled={resolveLoading}>{resolveLoading ? "Resolving..." : "Resolve"}</button>
                  </div>
                )}

                <form onSubmit={handleResolution}>
                    {resolutionError && <p className="error-message">{resolutionError}</p>}
                    {complaint.status === "resolved" && (
                        <div className="form-group">
                            <label>Add Resolution</label>
                            <textarea className="resolution" placeholder="Enter a Resolution..." value={resolution} onChange={(e)=>setResolution(e.target.value)}/>
                            <button type="submit" className="start-button" disabled={resolutionLoading}>{resolutionLoading ? "Submitting...":"Submit"}</button>
                            {resolutionSuccess && <p className="success-message">{resolutionSuccess}</p>}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default StaffComplaintsDetails;
