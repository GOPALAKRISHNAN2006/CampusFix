import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import StudentDashboard from "./pages/student/StudentDashboard";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import RoleRoute from "./routes/RoleRoute";
function App() {
    return (
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route
                    path="/"
                    element={<Home/>}
                />
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/student/dashboard" element={
                    <ProtectedRoutes>
                        <RoleRoute allowedRole="student">
                            <StudentDashboard/>
                        </RoleRoute>
                    </ProtectedRoutes>
                    }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;