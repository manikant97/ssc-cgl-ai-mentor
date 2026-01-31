import Question from '../models/Question.js';

// @desc    Get a random question for practice
// @route   GET /api/questions
// @access  Public
export const getQuestions = async (req, res) => {
  try {
    // Get total count of questions
    const count = await Question.countDocuments();
    
    // Get a random entry
    const random = Math.floor(Math.random() * count);
    
    // Get the random question
    const question = await Question.findOne()
      .select('-__v -createdAt -updatedAt -correctOption -baseExplanation')
      .skip(random);
    
    if (!question) {
      return res.status(404).json({ message: 'No questions found' });
    }
    
    res.json([question]); // Return as array for frontend compatibility
  } catch (error) {
    console.error('Error fetching random question:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a single question by ID
// @route   GET /api/questions/:id
// @access  Public
export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).select('-__v -createdAt -updatedAt');
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get questions by subject and topic
// @route   GET /api/questions/subject/:subject/topic/:topic
// @access  Public
export const getQuestionsBySubjectAndTopic = async (req, res) => {
  try {
    const { subject, topic } = req.params;
    const questions = await Question.find({
      subject: new RegExp(subject, 'i'),
      topic: new RegExp(topic, 'i')
    }).select('-__v -createdAt -updatedAt');
    
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions by subject and topic:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
