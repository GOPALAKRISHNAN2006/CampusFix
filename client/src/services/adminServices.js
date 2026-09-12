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

export const createStaff = async(staffData)=>{
    const token = localStorage.getItem("token")
    if(!token){
        throw new Error("No Authentication token found");
    }

    const response = await api.post("/admin/staff",staffData,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    return response.data;
}
export const getAllStaffs = async()=>{
    const token = localStorage.getItem("token")
    if(!token){
        throw new Error("No Authentication token found");
    }

    const response = await api.get("/admin/staff",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    return response.data;
}

export const assignComplaint = async(complaintId,staffId)=>{
    const token = localStorage.getItem("token")
    if(!token){
        throw new Error("No Authentication token found");
    }

    const response = await api.patch(`/admin/complaints/${complaintId}/assign`,{
        staffId: staffId
    },{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    return response.data;
}

