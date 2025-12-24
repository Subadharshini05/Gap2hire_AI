import express from "express";
import {
  evaluateSTAR,
  generateQuestions,
  rewriteSTAR
} from "../controllers/interviewController.js";

const router = express.Router();

router.post("/generate-questions", generateQuestions);
router.post("/star-evaluate", evaluateSTAR);
router.post("/star-rewrite", rewriteSTAR);

export default router;
