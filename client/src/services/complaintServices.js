
import api from "./api.js";

export const getMyComplaint = async()=>{

    const token = localStorage.getItem("token");
    if(!token){
        throw new Error("No Authentication token Found");
    }

    
   const response = await api.get("/complaints/my",{
        headers : {
             Authorization:`Bearer ${token}`
        }
    });

    return response.data;
}   
    

export const getMyComplaintById = async(id)=>{
    const token = localStorage.getItem("token");
    if(!token){
        throw new Error("No Authentication token found");
    }

    const response = await api.get(`/complaints/${id}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

export const createComplaint = async(complaintData)=>{
    const token = localStorage.getItem("token");
    if(!token){
        throw new Error("No Authentication token found")
    }

    const response = await api.post("/complaints/",complaintData,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data;
}

export const closeComplaint = async(id)=>{

    const token = localStorage.getItem("token");
    if(!token){
        throw new Error("No Authentication token found");
    }
    const response = await api.patch(`/complaints/${id}/close`,{},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    return response.data;

}

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

