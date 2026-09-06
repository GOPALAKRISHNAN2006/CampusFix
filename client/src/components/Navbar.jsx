
import "./Navbar.css"
function Navbar(){
    return(
        <nav className="navbar">
            <div className="navbar-logo">CampusFix</div>
            <div className="navbar-links">
                <a href="/">Home</a>
                <a href="/">Login</a>
                <a href="/">Register</a>
            </div>
        </nav>
    )
}

export default Navbar;