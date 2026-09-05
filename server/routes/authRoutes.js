import express from "express";
import { registerUser,loginUser } from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { getProfile } from "../controller/userController.js";

import authorize from "../middleware/roleMiddleware.js";

import {
    studentTest,
    staffTest,
    adminTest
} from "../controller/testController.js";

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/me",protect,getProfile);

//role test
router.get(
    "/student-test",
    protect,
    authorize("student"),
    studentTest
);

router.get(
    "/staff-test",
    protect,
    authorize("staff"),
    staffTest
);

router.get(
    "/admin-test",
    protect,
    authorize("admin"),
    adminTest
);

export default router;