import Complaint from "../models/Complaint.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";



export const getAllComplaints = async(req,res)=>{
    try{
        const complaints = await Complaint.find()
        .populate("student", "name email phone")
        .populate("assignedStaff", "name email phone")
        .sort({ createdAt: -1});

        return res.status(200).json({
            success: true,
            count: complaints.length,
            complaints
        })
    }catch(error){
        console.log("Get All complaints error:",error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching complaints"
        });
    }
};

export const createStaff = async(req,res)=>{
    try{
        const {name, email, password, phone} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "name,email and password fields are required!"
            });
        }

        const existingUser = await User.findOne({
            email
        });

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User with this email is already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const staff = await User.create({
            name, email, password: hashedPassword, role:"staff", phone
        })
        return res.status(201).json({
            success: true,
            message: "Staff Created Successfully!",
            staff: {
                id: staff._id,
                name: staff.name,
                email: staff.email,
                role: staff.role,
                phone: staff.phone
            }
        });
    }
    catch(error){
         console.error("Create staff error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while creating staff"
        });
    }
};

export const assignComplaint = async(req,res) =>{
    try{
       const { complaintId } = req.params;
       const { staffId } = req.body;

       if(!staffId){
        return res.status(400).json({
            success: false,
            message: "Staff ID is required"
        });
       }

       const staff = await User.findOne({
            _id : staffId,role:"staff"
       });  

       if(!staff){
           return res.status(404).json({
                success: false,
                message: "Staff member not found"
          });
       }
       const complaint = await Complaint.findById(complaintId);
       if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }
        complaint.assignedStaff = staff._id;
        complaint.status = "assigned";
        await complaint.save();

        const updateComplaint = await Complaint.findById(complaint._id)
        .populate("student","name email phone")
        .populate("assignedStaff","name email phone");

        return res.status(200).json({
            success: true,
            message: "Complaint assigned successfully",
            complaint: updateComplaint
        })
    }
    catch(error){
        console.error("Assign complaint error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while assigning complaint"
        });
    }
}

export const getComplaintById = async(req,res)=>{
    try{
        const {id} = req.params;
        const complaint = await Complaint.findById(id)
        .populate("student", "name email phone")
        .populate("assignedStaff", "name email phone");

        return res.status(200).json({
            success: true,
            complaint
        })
    }catch(error){
        console.log("Get complaints error:",error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching complaints"
        });
    }
}