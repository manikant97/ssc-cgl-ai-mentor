import express from "express";
import Attempt from "../models/Attempt.js";
import Question from "../models/Question.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userName, questionId, selectedOption } = req.body;

    if (!userName || typeof userName !== "string" || !userName.trim()) {
      return res.status(400).json({ error: "userName is required" });
    }

    if (!questionId || typeof selectedOption !== "number") {
      return res.status(400).json({ error: "questionId and selectedOption are required" });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    if (!Array.isArray(question.options) || selectedOption < 0 || selectedOption >= question.options.length) {
      return res.status(400).json({ error: "selectedOption is out of range" });
    }

    const isCorrect = selectedOption === question.correctOption;
    const selectedOptionText = question.options[selectedOption];

    await Attempt.create({
      userName: userName.trim(),
      questionId,
      selectedOption,
      selectedOptionText,
      isCorrect,
    });

    res.json({ isCorrect });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/summary", async (req, res) => {
  try {
    const name = req.query.name;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "name query param is required" });
    }

    const userName = name.trim();
    const [total, correct] = await Promise.all([
      Attempt.countDocuments({ userName }),
      Attempt.countDocuments({ userName, isCorrect: true }),
    ]);

    res.json({
      total,
      correct,
      wrong: total - correct,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
