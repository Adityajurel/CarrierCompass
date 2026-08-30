import { Router } from "express";

import {
  predictCollege,
} from "../controllers/college.controller.js";

const router = Router();

router.post("/predict", predictCollege);

export default router;