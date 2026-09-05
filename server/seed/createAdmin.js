import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async() =>{
    try{
        await connectDB();

        const existingAdmin = await User.findOne({
            email: env.process.ADMIN_EMAIL
        });
        if(existingAdmin){
            console.log("Admin already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(env.process.ADMIN_PASSWORD, 10);

        await User.create({
            name: "CampusFix Admin",
            email:env.process.ADMIN_EMAIL,
            password: hashedPassword,
            role:"admin",
            phone:"9342272925"
        });
        console.log("Admin created successfully");
        process.exit(0);
    }
    catch(error){
        console.log("Error creating admin:",error);
        process.exit(1);
    }
};

createAdmin();
