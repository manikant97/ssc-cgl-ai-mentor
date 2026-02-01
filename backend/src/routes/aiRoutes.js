import express from "express";
import Question from "../models/Question.js";
import { generateQuestion } from "../services/aiQuestionGenerator.js";

const router = express.Router();

router.post("/generate-question", async (req, res) => {
  try {
    const question = await generateQuestion();
    const saved = await Question.create(question);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
