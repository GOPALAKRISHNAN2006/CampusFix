import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async(req,res,next) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success: false,
                message : "Not Authorized.Please login!..."
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token ,process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({
                success: false,
                message: "User no longer exists."
            });
        }

        req.user = user;

        next();
    }

    catch(error){
         console.error("Authentication error:", error.message);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token has expired. Please login again."
            });
        }
         if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Authentication failed."
        });
    }
};