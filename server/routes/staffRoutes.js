import { getAssignedComplaints, startWork, resloveComplaint,addResolution } from "../controller/staffController.js";
import express from "express"
import authorize from "../middleware/roleMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/complaints",protect,authorize("staff"),getAssignedComplaints);
router.patch("/complaints/:complaintId/start",protect,authorize("staff"),startWork);
router.patch("/complaints/:complaintId/resolve",protect,authorize("staff"),resloveComplaint);
router.patch("/complaints/:complaintId/resolution",protect,authorize("staff"),addResolution);
export default router;