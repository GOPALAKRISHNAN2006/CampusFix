import Complaint from  "../models/Complaint.js";

export const createComplaint = async(req,res) =>{
    try{
        const { title, description,category, priority,image } = req.body
        if(!title || !description || !category){
            return res.status(400).json({
                success: false,
                message: "title,description and category is required"
            });
        }

        const complaint = await Complaint.create({
            title,
            description,
            category,
            priority: priority || "medium",
            student: req.user._id,
            image: image || null
        });

        return res.status(201).json({
            success: true,
            message: "Complaint submiited successfully",
            complaint
        })

    }catch(error){
         console.error("Create complaint error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to Add Complaint"
        })
    }
};


export const getMyComplaints = async(req,res) => {
    try{
        const complaint = await Complaint.find({
            student: req.user._id
        }).sort({ createdAt: -1});
        if(!complaint){
            return res.status(400).json({
                success: false,
                message : "No complaints found"
            });
        }
        return res.status(200).json({
            success: true,
            count: complaint.length,
            complaint
        })
    }
    catch(error){
        console.log("Error while fetching complaints:",error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching caomplaints"
        })
    }
};

export const getComplaintById = async(req,res)=>{
    try{
        const {id} = req.params;

        const complaint = await Complaint.findById(id);
        if(!complaint){
            return res.status(400).json({
                success:false,
                message: "Complaints not found..."
            });
        }

        if(complaint.student.toString() !== req.user._id.toString()){
            return res.status(400).json({
                success: false,
                message: "You do not have permissioin for view this."
            })
        }

        return res.status(200).json({
            success: true,
            complaint
        })
    }catch(error){
        console.error("Get complaint error:", error);
        return res.status(500).json({
            success: false,
            message: "Error while Fetching complaint"
        })
    }
}


export const closeComplaint = async (req, res) => {
    try {
        const { id } = req.params;

        const complaint = await Complaint.findById(id);

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        if (complaint.student.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to close this comlpaint"
            });
        }


        if (complaint.status !== "resolved") {
            return res.status(400).json({
                success: false,
                message: "Complaint is not in resloved status"
            });
        }

        complaint.status = "closed";

        await complaint.save();

        return res.status(200).json({
            success: true,
            message: "Complaint closed successfully",
            complaint: {
                id: complaint._id,
                title: complaint.title,
                status: complaint.status,
                resolution: complaint.resolution
            }
        });

    } catch (error) {
        console.error("Close Compaint error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while closing complaint"
        });
    }

};
