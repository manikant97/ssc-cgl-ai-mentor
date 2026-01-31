import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true
  },
  topic: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  questionText: {
    type: String,
    required: true,
    trim: true
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length === 4; // Ensure exactly 4 options
      },
      message: 'There must be exactly 4 options.'
    }
  },
  correctOption: {
    type: Number,
    required: true,
    min: 0,
    max: 3 // 0-based index for options array
  },
  baseExplanation: {
    type: String,
    required: true,
    trim: true
  },
  expectedTime: {
    type: Number, // in seconds
    required: true,
    min: 10 // minimum 10 seconds per question
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
questionSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  if (typeof next === "function") next();
});

export default mongoose.model("Question", questionSchema);
