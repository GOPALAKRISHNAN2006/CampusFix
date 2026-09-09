import api from "./api";
export const getAllComplaint = async()=>{
    const token = localStorage.getItem("token");
    if(!token){
        throw new Error("No Authentication token found");
    }
    const response = await api.get("/admin/complaints",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    return response.data;
}

export const getComplaintById = async(id)=>{
    const token = localStorage.getItem("token");
    if(!token){
        throw new Error("No Authentication token found");
    }

    const response = await api.get(`/admin/complaints/${id}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const createStaff = async(satffData)=>{
    const token = localStorage.getItem("token")
    if(!token){
        throw new Error("No Authentication token found");
    }

    const response = await api.post("/admin/staff",satffData,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    return response.data;
}