import { useEffect, useState } from "react";
import { getAssignedComplaints } from "../../services/staffServices";
import { Link } from "react-router-dom";
function StaffComplaints(){

    const [error,setError] = useState("");
    const [loading,setLoading] = useState(true);
    const [complaints,setComplaints] = useState([]);

    useEffect(()=>{
        const fetchComplaints = async() =>{
            try{
                const data = await getAssignedComplaints();
                setComplaints(data.complaints);
            }catch(error){
                console.log(error);
                setError(error.response?.data?.message || "Failed to Load complaints");
            }finally{
                setLoading(false);
            }
        }
        fetchComplaints();
    },[]);

    if(loading){
        return <h2>Loading...</h2>
    }

    return(
        <div className="complaint-page">
            <div className="complaint-header">
                <h2>Complaints</h2>
                <p>Complaints Details</p>
            </div>
         {error && <p className="error">{error}</p>}
         {complaints.length === 0 ? (
            <div className="empty-state">
                <h2>Not Found</h2>
                <p>No complaints to resolve</p>
            </div>
         ) : (
            <div className="complaint-list">
                {complaints.map((complaint)=>{
                    return(
                    <div className="complaint-card" key={complaint._id}>
                        <div className="complaint-content">
                            <h3>{complaint.title}</h3>
                            <p>{complaint.description}</p>
                        </div>
                        <div className="complaint-details">
                            <p>Category:{complaint.category}</p>
                            <p>Priority:{complaint.priority}</p>
                            <p>Status:{complaint.status}</p>
                        </div>
                        <Link to={`/staff/complaints/${complaint._id}`} className="view">View Details</Link>
                    </div>
                )})}
                <Link to="/staff/dashboard" className="back-btn">Back</Link>
            </div>
         )}
        </div>
    )
}

export default StaffComplaints;