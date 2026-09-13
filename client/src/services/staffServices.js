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

export const getComplaintsById = async(id)=>{
    const token = localStorage.getItem("token");
    if(!token){
        throw new Error("No Authentication token found");
    }

    const response = await api.get(`/staff/complaints/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data;
}

export const startWorking = async(id)=>{
    const token = localStorage.getItem("token");
    if(!token){
        throw new Error("No Authentication token found");
    }

    const response = await api.patch(`/staff/complaints/${id}/start`,{},{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    response.data;
}
export const Resolve = async(id)=>{
    const token = localStorage.getItem("token");
    if(!token){
        throw new Error("No Authentication token found");
    }

    const response = await api.patch(`/staff/complaints/${id}/resolve`,{},{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    response.data;
}

export const Resolution = async(id,resolution)=>{
    const token = localStorage.getItem("token");
    if(!token){
        throw new Error("No Authentication token found");
    }

    const response = await api.patch(`/staff/complaints/${id}/resolution`,{resolution},{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    response.data;

}