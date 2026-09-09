import { getAllComplaint } from "../../services/adminServices";
import { useAuth } from "../../context/AuthContext";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

function AdminDashboard(){

    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");
    const [complaints,setComplaints] = useState([]);

    const {user} = useAuth

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
    },[]);

    const totalComplaints = complaints.length;
    const pendingComplaints = complaints.filter((complaint)=>complaint.status ==="pending").length;
    const inprogressComplaints = complaints.filter((complaint)=>complaint.status ==="in-progress").length;
    const assignedComplaints = complaints.filter((complaint)=>complaint.status ==="assigned").length;
    const resolvedComplaints = complaints.filter((complaint)=>complaint.status ==="resolved").length;
    const closedComplaints = complaints.filter((complaint)=>complaint.status ==="closed").length;

    if(loading){
        return <h2 className="loading">Loading...</h2>
    }
    return(
        <div className="admin-dashboard">
            <div className="admin-header">
                <div>
                   <h2>Admin Dashboard</h2>
                   <p>Welcome to Admin Dashboard, {user?.name || "Admin"}</p>
                </div>
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="admin-summary">
                <div className="admin-card">
                    <h3>Total Complaints</h3>
                    <p>{totalComplaints}</p>
                </div>
                <div className="admin-card">
                    <h3>Pending</h3>
                    <p>{pendingComplaints}</p>
                </div>
                <div className="admin-card">
                    <h3>In Progress</h3>
                    <p>{inprogressComplaints}</p>
                </div>
                <div className="admin-card">
                    <h3>Assigned</h3>
                    <p>{assignedComplaints}</p>
                </div>
                <div className="admin-card">
                    <h3>Resolved</h3>
                    <p>{resolvedComplaints}</p>
                </div>
                <div className="admin-card">
                    <h3>Closed</h3>
                    <p>{closedComplaints}</p>
                </div>
                <div className="admin-actions">
                    <Link to="/admin/complaints" className="admin-button">View All Complaints</Link>
                    <Link to="/admin/staff" className="admin-button">Create Staff</Link>
                </div>
            </div>
        </div>
    )
}




export default AdminDashboard;