import React from "react";

const QuizCard = ({
  currentQuestion,
  currentQuestionIndex,
  selectedAnswer,
  resultMessage,
  checkAnswer,
}) => {
  return (
    <div className="bg-white/90 rounded-3xl shadow-2xl p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Q{currentQuestionIndex + 1}. {currentQuestion.question}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(currentQuestion.options).map(([key, value]) => (
          <button
            key={key}
            onClick={() => checkAnswer(key)}
            className={`p-4 rounded-2xl text-left font-semibold border-2 transition duration-300 ${
              selectedAnswer === key
                ? "bg-indigo-100 border-indigo-600"
                : "bg-gray-50 border-transparent hover:bg-indigo-50 hover:scale-[1.02]"
            }`}
          >
            {key}. {value}
          </button>
        ))}
      </div>

      {resultMessage && (
        <div className="mt-6 text-center text-xl font-bold text-gray-800">
          {resultMessage}
        </div>
      )}
    </div>
  );
};

export default QuizCard;
