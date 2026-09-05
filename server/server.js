import connectDB from "./config/db.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/",(req,res)=>{
    res.json({
        messgage: "CampusFix API is Running"
    });
});

app.use("/api/auth",authRoutes);
app.use("/api/complaints",complaintRoutes);
app.use("/api/admin",adminRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})