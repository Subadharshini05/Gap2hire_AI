import express from "express";
import { evaluateSTAR } from "../controllers/interviewController.js";

const router = express.Router();

router.post("/star-evaluate", evaluateSTAR);

export default router;
