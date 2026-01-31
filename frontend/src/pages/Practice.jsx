import { useEffect, useState } from "react";
import api from "../services/api";

export default function Practice() {
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    api
      .get("/api/questions")
      .then((res) => setQuestion(res.data[0]))
      .catch((err) => console.error(err));
  }, []);

  if (!question) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800">Practice</h1>

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
              onClick={() => setSubmitted(true)}
              className="mt-4 px-4 py-2 bg-black text-white rounded disabled:opacity-50"
            >
              Submit
            </button>
          )}

          {submitted && (
            <div className="mt-6 p-4 bg-gray-100 rounded">
              <p className="font-semibold">
                {selectedOption === question.correctOption
                  ? "✅ Correct Answer"
                  : "❌ Incorrect Answer"}
              </p>

              <p className="mt-2 text-sm text-gray-700">
                {question.baseExplanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
