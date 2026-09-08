import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import StudentDashboard from "./pages/student/StudentDashboard";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import RoleRoute from "./routes/RoleRoute";
import MyComplaints from "./pages/complaints/MyComplaints";
import ComplaintsDetails from "./pages/complaints/ComplaintsDetails";
import CreateComplaint from "./pages/complaints/CreateComplaint";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminComplaints from "./pages/admin/AdminComplaints";
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
                <Route path="/student/complaints" element={
                    <ProtectedRoutes>
                        <RoleRoute allowedRole="student">
                            <MyComplaints/>
                        </RoleRoute>
                    </ProtectedRoutes>
                }/>
                <Route path="/student/complaints/:id" element={
                    <ProtectedRoutes>
                        <RoleRoute allowedRole="student">
                            <ComplaintsDetails/>
                        </RoleRoute>
                    </ProtectedRoutes>
                }/>
                <Route path="/student/complaints/create" element={
                    <ProtectedRoutes>
                        <RoleRoute allowedRole="student">
                            <CreateComplaint/>
                        </RoleRoute>
                    </ProtectedRoutes>
                }/>
                <Route path="/admin/dashboard/" element={
                    <ProtectedRoutes>
                        <RoleRoute allowedRole="admin">
                            <AdminDashboard/>
                        </RoleRoute>
                    </ProtectedRoutes>
                }/>
                <Route path="/admin/complaints/" element={
                    <ProtectedRoutes>
                        <RoleRoute allowedRole="admin">
                            <AdminComplaints/>
                        </RoleRoute>
                    </ProtectedRoutes>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;