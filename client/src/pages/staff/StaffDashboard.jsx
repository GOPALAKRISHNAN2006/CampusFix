import { useState,useEffect } from "react";
import { getAssignedComplaints } from "../../services/staffServices";
import { useAuth } from  "../../context/AuthContext"
import { Link } from "react-router-dom";
import "./StaffDashboard.css"
function StaffDashboard(){

    const [error,setError] = useState("");
    const [loading,setLoading] = useState(true);
    const [complaints,setComplaints] = useState([]);

    const { user } = useAuth();
    useEffect(()=>{
        const fetchCOmplaints = async()=>{
        try{
            const response = await getAssignedComplaints();
            console.log(response.data);
            setComplaints(response.complaints); 
        }catch(error){
            console.log(error);
            setError(error.response?.data?.message);
        }finally{
            setLoading(false);
        }
      }
      fetchCOmplaints();
    },[]);

    const total = complaints.length;
    const assignedComplaint = complaints.filter((complaint)=>complaint.status === "assigned").length;
    const inprogressComplaint = complaints.filter((complaint)=>complaint.status === "in-progress").length;
    const resolvedComplaint = complaints.filter((complaint)=>complaint.status === "resolved").length;
    if(error){
        return <p className="error-message">{error}</p>
    }

    if(loading){
        return <h2 className="loading">Loaading</h2>
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <h2>Staff Dashboard</h2>
                <p>Welcome back,{user.name} </p>
            </div>
            <div className="summary-section">
                <div className="summary-card">
                    <h3>Total Complaints</h3>
                    <p>{total}</p>
                </div>
                <div className="summary-card">
                    <h3>Assigned Complaints</h3>
                    <p>{assignedComplaint}</p>
                </div>
                <div className="summary-card">
                    <h3>In-Progress Complaints</h3>
                    <p>{inprogressComplaint}</p>
                </div>
                <div className="summary-card">
                    <h3>Resolved Complaints</h3>
                    <p>{resolvedComplaint}</p>
                </div>
            </div>

            <div className="complaint-section">
                <strong>Assigned Complaints</strong>
                <Link to="/staff/complaints" className="view">View All</Link>
            </div>

            {complaints.length === 0 ? (
                <div className="empty-state">
                    <h3>No Complaints</h3>
                    <p>NO complaints have been assigned to you</p>
                </div>
            ):(
                <div className="complaint-list">
                    {complaints.slice(0,5).map((complaint)=>(
                        <div className="complaint-card" key={complaint._id}>
                            <h3>{complaint.title}</h3>
                            <p>{complaint.description}</p>
                            <div>
                                <span>Status:{complaint.status}</span>
                                <span>Priority:{complaint.priority}</span>
                                <span>Category:{complaint.category}</span>
                            </div>
                            <Link to="/staff/complaints/:id" className="view">View Details</Link>
                        </div>
                        
                    ))}
                </div>
            )}
        </div>
    )
}

export default StaffDashboard;