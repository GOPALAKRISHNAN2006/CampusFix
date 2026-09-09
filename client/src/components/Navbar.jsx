import {Link,useNavigate} from "react-router-dom"
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";


function Navbar(){
    const {user,logout} = useAuth();
    const navigate  = useNavigate();

    const handleLogout = () =>{
        logout();
        navigate("/login");
    };
    return(
        <nav className="navbar">
            <div className="navbar-logo">CampusFix</div>
            <div className="navbar-links">
            
                <Link to="/">Home</Link>
                {user ? (
                    <>
                    <Link to={`/${user.role}/dashboard`}>Dashboard</Link>
                    <button onClick={handleLogout} className="logout">Logout</button>
                    </>
                ):(
                    <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    </>
                )
            }
            </div>
        </nav>
    )
}

export default Navbar;