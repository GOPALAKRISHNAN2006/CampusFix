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
import AdminComplaintsDetails from "./pages/admin/AdminComplaintsDetails";
import CreateStaff from "./pages/admin/CreateStaff";
import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffComplaints from "./pages/staff/StaffComplaints";
import StaffComplaintsDetails from "./pages/staff/StaffComplaintsDetails";
function App() {
    return (
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
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
                <Route path="/admin/complaints/:id" element={
                    <ProtectedRoutes>
                        <RoleRoute allowedRole="admin">
                            <AdminComplaintsDetails/>
                        </RoleRoute>
                    </ProtectedRoutes>
                }/>
                <Route path="/admin/staff" element={
                    <ProtectedRoutes>
                        <RoleRoute allowedRole="admin">
                            <CreateStaff/>
                        </RoleRoute>
                    </ProtectedRoutes>
                }/>
                <Route path="/staff/dashboard" element={
                    <ProtectedRoutes>
                        <RoleRoute allowedRole="staff">
                            <StaffDashboard/>
                        </RoleRoute>
                    </ProtectedRoutes>
                }/>
                <Route path="/staff/complaints" element={
                    <ProtectedRoutes>
                        <RoleRoute allowedRole="staff">
                            <StaffComplaints/>
                        </RoleRoute>
                    </ProtectedRoutes>
                }/>
                <Route path="/staff/complaints/:id" element={
                    <ProtectedRoutes>
                        <RoleRoute allowedRole="staff">
                            <StaffComplaintsDetails/>
                        </RoleRoute>
                    </ProtectedRoutes>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;