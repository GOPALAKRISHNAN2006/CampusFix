import { Link, useParams } from "react-router-dom";
import { getComplaintById,getAllStaffs,assignComplaint } from "../../services/adminServices";
import { useState,useEffect } from "react";
import "./Admin.css"
function AdminComplaintsDetails(){

    const {id} = useParams();
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(true);
    const [complaint, setComplaint] = useState(null);
    const [staffs, setStaffs] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState("");
    const [assignLoading,setAssignLoading] = useState(false);
    const [success, setSuccess] = useState("");

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

    useEffect(()=>{
        const getStaffs = async()=>{
        try{
            const data = await getAllStaffs();
            setStaffs(data.staffs || []);
        }catch(error){
            console.log(error);
            
        }
      }
      getStaffs();
    },[]);
    
    const handleAssign = async()=>{
        if(!selectedStaff){
            setError("Please select a staff member");
            return;
        }
        setAssignLoading(true);
        setSuccess("");
        setError("");
        try{
            await assignComplaint(id,selectedStaff);
            setSuccess("Staff Assigned Successfully");
        }catch(error){
            console.log(error);
            setError(error.response?.data?.message || "Failed to Assign Staff");
        }finally{
            setAssignLoading(false);
        }
    }

    if(loading){
        return <h2 className="loading">Loading...</h2>
    }

    if(error){
        return(
         <div className="details-page">
            <p className="error-message">{error}</p>
            <Link to="/student/complaints" className="back-btn">Back to Complaints</Link>
        </div>
        )
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
                <p>View the complete complaint information.</p>
            </div>
            <Link to="/admin/complaints" className="back-btn">Back</Link>
        </div>
        {success && <p className="success-message">{success}</p>}
        <div className="details-card">
            <h2>Title:{complaint.title}</h2>
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
                <strong>Resolution</strong>
                <p>{complaint.resolution || "No Resolution Added yet"}</p>
            </div>
            <hr/>
            <h2>Assigned Staff</h2>
            {complaint.assignedStaff ? (
                <div className="assign-staff">
                    <strong>Name:</strong>
                    <p>{complaint.assignedStaff.name}</p>
                </div>
            ):(
                <p>Not Assigned</p>
            )}
            <hr/>

            <div className="assign-complaint">
                <h2>Assign Complaint</h2>
                <div className="form-group">
                    <label>Select Staff</label>
                    <select value={selectedStaff} onChange={(e)=>setSelectedStaff(e.target.value)}>
                        <option value="">Select Staff</option>
                        {staffs.map((member)=>(
                            <option key={member._id} value={member._id}>{member.name}</option>
                        ))}
                    </select>
                    <button className="assign-button" onClick={handleAssign} disabled={assignLoading}>
                        {assignLoading ? "Assigning...":"Assign Complaint"}
                    </button>
                </div>
                <Link
                    to="/admin/complaints"
                    className="back-btn"
                >
                    Back to Complaints
                </Link>
            </div>
        </div>
    </div>
    )

}

export default AdminComplaintsDetails;