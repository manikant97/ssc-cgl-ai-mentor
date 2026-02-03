import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema({
  userName: String,
  questionId: mongoose.Schema.Types.ObjectId,
  selectedOption: Number,
  selectedOptionText: String,
  isCorrect: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Attempt", attemptSchema);
