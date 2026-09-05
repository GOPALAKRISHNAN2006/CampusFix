
import express from "express";
import { createComplaint, getMyComplaints,getComplaintById } from "../controller/complaintController.js";
import { protect } from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/",protect, authorize("student"),createComplaint);
router.get("/my", protect, authorize("student"), getMyComplaints)
router.get("/my/:id", protect, authorize("student"), getComplaintById)

export default router;