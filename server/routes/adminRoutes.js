import express from "express";
import { createStaff, getAllComplaints,assignComplaint,getComplaintById, getStaff } from "../controller/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/complaints/:id",protect,authorize("admin"), getComplaintById);
router.get("/complaints",protect,authorize("admin"), getAllComplaints);
router.get("/staff",protect,authorize("admin"), getStaff);
router.post("/staff",protect,authorize("admin"), createStaff);
router.patch("/complaints/:complaintId/assign", protect,authorize("admin"),assignComplaint);

export default router;