import { Link } from "react-router-dom"
import { useAuth } from  "../../context/AuthContext"
import "./StudentDashboard.css";
import { useState,useEffect } from "react";
import api from "../../services/api";

function StudentDashboard() {
    const [complaints,setComplaints] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");
    const { user } = useAuth();

    useEffect(()=>{
        const getComplaints = async()=>{
            const token = localStorage.getItem("token");
            if(!token){
                setLoading(false);
                return;
            }
            try{
                const response = await api.get("/complaints/my",{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setComplaints(response.data.complaint);

            }catch(error){
                console.log(error);
                setError(error.response?.data?.message || "Failed to Load Compalaints");
            }finally{
                setLoading(false);
            }
        }
        getComplaints();
    },[]);

    const totalComplaints = complaints.length;

    const pendingComplaints = complaints.filter((complaint)=> complaint.status === "pending").length;
    const inProgressComplaints = complaints.filter((complaint)=> complaint.status === "in-progress").length;
    const resolvedComplaints = complaints.filter((complaint)=> complaint.status === "resolved").length;

    const recentComplaints = complaints.slice(0,3);

    return(
        <div className="student-dashboard">
            <div className="dashboard-header">
                <div>
                    <h1>Student Dashboard</h1>
                    <p>Welcome back, {user?.name || "student"}</p>
                    {error && (<p className="error-message">{error}</p>)}
                </div>
                <Link to="/student/complaints/create" className="complaint-button">Submit Complaint</Link>
            </div>

            <div className="summary-section">
                <div className="summary-card">
                    <h3>Total Complaints</h3>
                    <p>{totalComplaints}</p>
                </div>
                <div className="summary-card">
                    <h3>Pending</h3>
                    <p>{pendingComplaints}</p>
                </div>
                <div className="summary-card">
                    <h3>In progress</h3>
                    <p>{inProgressComplaints}</p>
                </div>
                <div className="summary-card">
                    <h3>Resolved</h3>
                    <p>{resolvedComplaints}</p>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="recent-complaints">
                    <div className="section-header">
                        <h2>Recent Complaints</h2>
                        <Link to="/student/complaints" className="view-all">
                          View All
                        </Link>
                    </div>
                    {recentComplaints.length === 0? (
                        <div className="empty-state">
                        <h3>No Complaints yet</h3>
                        <p>You haven't submitted any complaints</p>
                        <Link to="/student/complaints/create" className="empty-button">Submit Your First Complaint</Link>
                    </div>
                    ):(
                        <div className="complaint-list">
                            {recentComplaints.map((complaint)=>(
                                <div className="complaint-card" key={complaint._id}>
                                    <div>
                                    <h3>{complaint.title}</h3>
                                    <p>{complaint.description}</p>
                                    </div>
                                    <div className="complaint-info">
                                        <span className="status">{complaint.status}</span>
                                        <span className="priority">{complaint.priority}</span>

                                    </div>
                                </div>
                                
                            ))}
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default StudentDashboard;