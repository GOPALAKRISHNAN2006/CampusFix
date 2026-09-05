
import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true
        },

        description:{
            type: String,
            required: true,
            trim: true
        },

        category:{
            type: String,
            required: true
        },

        priority:{
            type: String,
            enum : ["low","medium","high","critical"],
            default: "medium"
        },

        status:{
            type: String,
            enum : ["pending", "assigned", "in-progress", "resolved", "closed"],
            default: "pending"
        },

        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        assignedStaff: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        image: {
            type: String,
            default: null
        },
        resolution: {
           type: String,
           default: null,
           trim: true 
        }
    },{
        timestamps: true
    }
);

export default mongoose.model("Complaint",complaintSchema);