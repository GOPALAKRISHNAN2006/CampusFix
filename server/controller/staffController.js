import Complaint from "../models/Complaint.js";

export const getAssignedCompaints = async(req,res)=>{
    try{
        const complaints = await Complaint.find({
            assignedStaff : req.user._id
        })
        .populate("student","name email phone")
        .populate("assignedStaff","name email phone")
        .sort({ createdAt: -1});

        return res.status(200).json({
            success:true,
            count: complaints.length,
            complaints
        })
    }catch(error){
        console.log("Erro while fetching assigned complaints", error);
        res.status(500).json({
            success: false,
            message : "Server error while fetching complaints"
        })

    }
}

export const startWork = async (req, res) => {
    try {
        const { complaintId } = req.params;

        const complaint = await Complaint.findById(complaintId);

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        // Check whether this complaint is assigned to the logged-in staff
        if (
            !complaint.assignedStaff ||
            complaint.assignedStaff.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not assigned to this complaint"
            });
        }

        // Complaint must be in assigned state
        if (complaint.status !== "assigned") {
            return res.status(400).json({
                success: false,
                message: "Complaint is not in assigned status"
            });
        }

        complaint.status = "in-progress";

        await complaint.save();

        return res.status(200).json({
            success: true,
            message: "Complaint work started successfully",
            complaint: {
                id: complaint._id,
                title: complaint.title,
                description: complaint.description,
                category: complaint.category,
                priority: complaint.priority,
                status: complaint.status,
                assignedStaff: complaint.assignedStaff,
                student: complaint.student
            }
        });

    } catch (error) {
        console.error("Start work error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while starting complaint"
        });
    }
};

export const resloveComplaint = async (req, res) => {
    try {
        const { complaintId } = req.params;

        const complaint = await Complaint.findById(complaintId);

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        if (
            !complaint.assignedStaff ||
            complaint.assignedStaff.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not assigned to this complaint"
            });
        }

        // Complaint must be in in-progress state
        if (complaint.status !== "in-progress") {
            return res.status(400).json({
                success: false,
                message: "Complaint is not in-progress status"
            });
        }

        complaint.status = "resolved";

        await complaint.save();

        return res.status(200).json({
            success: true,
            message: "Complaint resolved successfully",
            complaint: {
                id: complaint._id,
                title: complaint.title,
                description: complaint.description,
                category: complaint.category,
                priority: complaint.priority,
                status: complaint.status,
                assignedStaff: complaint.assignedStaff,
                student: complaint.student
            }
        });

    } catch (error) {
        console.error("Resolve Compaint error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while resolving complaint"
        });
    }

};

export const addResolution = async (req,res)=>{
    try{
        const { complaintId } = req.params;
        const { resolution } = req.body;

       
        if(!resolution || !resolution.trim()){
            return res.status(400).json({
                success: false,
                message: "Resolution Required"
            })
        }

         const complaint = await Complaint.findById(complaintId);

        if(!complaint){
            return res.status(400).json({
                success: false,
                message: "Complaint not found"
            });
        }

        if(!complaint.assignedStaff || complaint.assignedStaff.toString() !== req.user._id.toString()){
            return res.status(403).json({
                success: false,
                message: "You are not assigned for this complaint"
            });
        }

        if(complaint.status !== "resolved"){
            return res.status(400).json({
                success: false,
                message: "Complaint should be resolved before adding resolution"
            })
        }
        complaint.resolution = resolution.trim();

       await complaint.save();

       return res.status(200).json({
            success: true,
            message: "Resolution added successfully",
            complaint: {
                id: complaint._id,
                title: complaint.title,
                status: complaint.status,
                resolution: complaint.resolution,
                assignedStaff: complaint.assignedStaff
            }
        });
    }catch(error){
        console.log("Adding resolution error",error);
        return res.status(500).json({
            success: false,
            message: "Error while Adding Resolution"
        })
    }
}
