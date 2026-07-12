import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";

import { registerUser,loginUser,getCurrentUser,logoutUser,refreshAccessToken,uploadResume } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


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
export default router;