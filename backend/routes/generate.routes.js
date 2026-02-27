import { Router } from "express";
import { generateSummaryController } from "../controllers/generate.controller.js";

const router = Router();

router.post("/", generateSummaryController);

export default router;