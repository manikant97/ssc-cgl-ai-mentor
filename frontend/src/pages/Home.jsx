import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleStartPractice = () => {
    navigate('/practice');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">SSC CGL AI Mentor</h1>
        <p className="text-gray-600 mb-6">Daily practice. Smart guidance.</p>
        <button 
          onClick={handleStartPractice}
          className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Start Practice
        </button>
      </div>
    </div>
  );
}
