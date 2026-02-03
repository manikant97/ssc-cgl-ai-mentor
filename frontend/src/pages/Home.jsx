import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('ssc_user_name');
    if (savedName) setName(savedName);
  }, []);

  const handleStartPractice = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    localStorage.setItem('ssc_user_name', trimmed);
    navigate('/practice');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">SSC CGL AI Mentor</h1>
        <p className="text-gray-600 mb-6">Daily practice. Smart guidance.</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button 
          onClick={handleStartPractice}
          disabled={!name.trim()}
          className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Start Practice
        </button>
      </div>
    </div>
  );
}
