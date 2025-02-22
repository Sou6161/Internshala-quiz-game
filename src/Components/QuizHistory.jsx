import React, { useEffect, useState } from 'react';
import { getAttempts } from '../Utils/db';
import { History } from 'lucide-react';

const QuizHistory = () => {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    const loadAttempts = async () => {
      const history = await getAttempts();
      setAttempts(history.sort((a, b) => b.date - a.date));
    };
    loadAttempts();
  }, []);

  if (attempts.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-bold">Quiz History</h2>
      </div>
      <div className="space-y-3">
        {attempts.map((attempt) => (
          <div
            key={attempt.id}
            className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <div className="text-sm text-gray-500">
                {new Date(attempt.date).toLocaleDateString()}
              </div>
              <div className="font-medium">
                Score: {attempt.score}/{attempt.totalQuestions}
              </div>
            </div>
            <div className="text-lg font-bold text-blue-500">
              {((attempt.score / attempt.totalQuestions) * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizHistory