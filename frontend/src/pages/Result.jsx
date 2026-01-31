import { useNavigate } from 'react-router-dom';

export default function Result() {
  const navigate = useNavigate();
  
  // Mock data - will be replaced with actual results later
  const result = {
    totalQuestions: 10,
    correctAnswers: 7,
    score: 70,
    timeSpent: '5:30',
    accuracy: 70,
  };

  const handleRestart = () => {
    navigate('/practice');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Practice Complete!</h1>
          <p className="text-gray-600">Here's how you performed</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-indigo-50 p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-indigo-700 mb-2">{result.score}%</div>
            <div className="text-gray-600">Score</div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-green-700 mb-2">
              {result.correctAnswers}/{result.totalQuestions}
            </div>
            <div className="text-gray-600">Correct Answers</div>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-yellow-700 mb-2">{result.timeSpent}</div>
            <div className="text-gray-600">Time Spent</div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-blue-700 mb-2">{result.accuracy}%</div>
            <div className="text-gray-600">Accuracy</div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance Summary</h2>
          <p className="text-gray-600 mb-6">
            You answered {result.correctAnswers} out of {result.totalQuestions} questions correctly. 
            {result.score >= 70 ? 'Great job! Keep it up!' : 'Keep practicing to improve your score!'}
          </p>
          
          <div className="space-y-3">
            <button
              onClick={handleRestart}
              className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Restart Practice
            </button>
            <button
              onClick={handleHome}
              className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 px-4 rounded-md hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
