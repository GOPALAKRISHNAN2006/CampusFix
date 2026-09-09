import api from "./api.js";

export const getAssignedComplaints = async()=>{
    const token = localStorage.getItem("token");
    if(!token){
        throw new Error("No Authentication token found");
    }

    const response = await api.get("/staff/complaints",{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data;
}