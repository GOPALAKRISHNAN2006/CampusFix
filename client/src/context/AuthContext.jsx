import { createContext,useContext,useState,useEffect } from "react";
import api from "../services/api.js";

const AuthContext = createContext();
export function AuthProvider({ children }){
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
         const getCurrentUser = async()=>{
            const token = localStorage.getItem("token");
            if(!token){
                setLoading(false);
                return;
            }
            try{
                const response = await api.get("/auth/me",{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data.user);
                localStorage.setItem("user",JSON.stringify(response.data.user));
            }catch(error){
                console.log("Authentication Failed",error);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setUser(null);
            }finally{
                setLoading(false);
            }
        };
        getCurrentUser();
    },[]);

    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user,loading,logout}}>{children}</AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(){
    return useContext(AuthContext);
}

