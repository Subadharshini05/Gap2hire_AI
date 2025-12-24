import express from "express";
import {
  evaluateSTAR,
  generateQuestions
} from "../controllers/interviewController.js";

const router = express.Router();

router.post("/star-evaluate", evaluateSTAR);
router.post("/generate-questions", generateQuestions);

export default router;
