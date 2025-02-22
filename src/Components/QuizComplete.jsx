import React from 'react';
import { Trophy, RotateCcw, Save } from 'lucide-react';
import { saveAttempt } from '../Utils/db';

const QuizComplete = ({ score, totalQuestions, onRestart, timePerQuestion }) => {
  const percentage = (score / totalQuestions) * 100;
  
  const handleSave = async () => {
    const attempt = {
      id: Date.now().toString(),
      date: Date.now(),
      score,
      totalQuestions,
      timePerQuestion,
    };
    await saveAttempt(attempt);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
      <div className="mb-6">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
      </div>
      <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
      <div className="text-4xl font-bold mb-2 text-blue-600">
        {score}/{totalQuestions}
      </div>
      <div className="text-lg mb-6 text-gray-600">
        Score: {percentage.toFixed(1)}%
      </div>
      <div className="space-y-3">
        <button
          onClick={handleSave}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          Save Result
        </button>
        <button
          onClick={onRestart}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Try Again
        </button>
      </div>
    </div>
  );
};
export default QuizComplete;