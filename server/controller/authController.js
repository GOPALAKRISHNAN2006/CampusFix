import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const registerUser = async(req,res) =>{

    try{
        const {name, email, password,phone} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                sucess: false,
                message: "Name,email and password are required" 
            });
        }

        const existinguser = await User.findOne({ email })
        if(existinguser){
            return res.status(409).json({
                sucess: false,
                message : "Email already Exist,Use different email"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name, email, password:hashedPassword, phone
        });

        return res.status(201).json({
            success:true,
            message: "Registration Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone
            }
        })
    }catch(error){
        console.log("Registration failed:",error);

        return res.status(500).json({
            sucess: false,
            message: "Server error during registartion"
        });
    }
}

export const loginUser = async(req,res) =>{
   try{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({
            success: false,
            message: "User Not found,Please login!"
        });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,{
            expiresIn: "1d"
        }
    );

    return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone
        }
    });

   }catch(error){
       console.error("Login error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error during login"
        });
   }
}