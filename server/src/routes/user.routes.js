import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";

import { registerUser,loginUser,getCurrentUser,logoutUser,refreshAccessToken,uploadResume } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { analyzeResumeController } from "../controllers/user.controller.js";
import { getResumeAnalysis } from "../controllers/user.controller.js";


const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyJWT, getCurrentUser);

router.post("/logout", verifyJWT, logoutUser);
router.post("/refresh-token", refreshAccessToken);
router.post(
    "/upload-resume",
    verifyJWT,
    upload.single("resume"),
    uploadResume
);
router.post(
    "/analyze-resume",
    verifyJWT,
    analyzeResumeController
);
router.get(
    "/resume-analysis",
    verifyJWT,
    getResumeAnalysis
);
export default router;