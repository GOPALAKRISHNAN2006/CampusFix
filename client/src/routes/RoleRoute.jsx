import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleRoute({children,allowedRole}){
    const {user,loading} = useAuth();

    if(loading){
        return <h2>Loading...</h2>
    }

    if(!user){
        return <Navigate to="/login" replace/>
    }

    if(user.role !== allowedRole){
       return <Navigate to="/" replace/>
    }
    return children;
}

export default RoleRoute;