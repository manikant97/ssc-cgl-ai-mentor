import { useEffect, useState } from "react";
import api from "../services/api";

export default function Practice() {
  const TOTAL_QUESTIONS = 5;
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [lastIsCorrect, setLastIsCorrect] = useState(null);

  const fetchNewQuestion = async () => {
    try {
      setError(null);
      setQuestion(null);
      setSelectedOption(null);
      setSubmitted(false);
      setLastIsCorrect(null);

      await api.post("/api/ai/generate-question");

      const res = await api.get("/api/questions");
      setQuestion(res.data?.[0] || null);
    } catch (err) {
      console.error(err);
      setError("Failed to generate question");
    }
  };

  useEffect(() => {
    setAnsweredCount(0);
    setCorrectCount(0);
    setWrongCount(0);
    setLastIsCorrect(null);
    fetchNewQuestion();
  }, []);

  if (error) return <p className="text-center mt-20">{error}</p>;

  if (!question) return <p className="text-center mt-20">Loading...</p>;

  const handleSubmit = async () => {
    try {
      setError(null);
      const userName = localStorage.getItem("ssc_user_name");
      if (!userName || !userName.trim()) {
        setError("Please enter your name first");
        return;
      }
      const res = await api.post("/api/attempts", {
        userName: userName.trim(),
        questionId: question._id,
        selectedOption,
      });

      const isCorrect = !!res?.data?.isCorrect;
      setLastIsCorrect(isCorrect);
      setAnsweredCount((c) => c + 1);
      if (isCorrect) setCorrectCount((c) => c + 1);
      else setWrongCount((c) => c + 1);

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Failed to save attempt");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800">Practice</h1>
        <p className="mt-1 text-sm text-gray-600">
          Question {Math.min(answeredCount + 1, TOTAL_QUESTIONS)} of {TOTAL_QUESTIONS}
        </p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {question.questionText}
          </h2>

          <div className="mt-4">
            {question.options.map((opt, i) => {
              let className = "w-full border p-2 my-2 rounded text-left ";

              if (submitted) {
                if (i === question.correctOption) {
                  className += "bg-green-200 border-green-500";
                } else if (i === selectedOption) {
                  className += "bg-red-200 border-red-500";
                }
              } else if (i === selectedOption) {
                className += "bg-blue-100 border-blue-400";
              }

              return (
                <button
                  key={i}
                  onClick={() => !submitted && setSelectedOption(i)}
                  className={className}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {!submitted && (
            <button
              disabled={selectedOption === null}
              onClick={handleSubmit}
              className="mt-4 px-4 py-2 bg-black text-white rounded disabled:opacity-50"
            >
              Submit
            </button>
          )}

          {submitted && (
            <div className="mt-6 p-4 bg-gray-100 rounded">
              <p className="font-semibold">
                {(lastIsCorrect ?? selectedOption === question.correctOption)
                  ? "✅ Correct Answer"
                  : "❌ Incorrect Answer"}
              </p>

              <p className="mt-2 text-sm text-gray-700">
                {question.baseExplanation}
              </p>

              {answeredCount < TOTAL_QUESTIONS ? (
                <button
                  onClick={fetchNewQuestion}
                  className="mt-4 px-4 py-2 bg-black text-white rounded"
                >
                  Next Question
                </button>
              ) : (
                <div className="mt-4 px-4 py-3 bg-white border rounded">
                  <p className="font-semibold">Summary</p>
                  <p className="mt-1 text-sm text-gray-700">"total": {TOTAL_QUESTIONS},</p>
                  <p className="text-sm text-gray-700">"correct": {correctCount},</p>
                  <p className="text-sm text-gray-700">"wrong": {wrongCount}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
