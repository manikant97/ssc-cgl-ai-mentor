import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const questions = await Question.find().sort({ createdAt: -1 }).limit(1);
  res.json(questions);
});

export default router;
