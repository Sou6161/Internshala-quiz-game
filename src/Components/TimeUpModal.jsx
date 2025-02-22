import React from 'react';
import { Clock, RotateCcw } from 'lucide-react';

export const TimeUpModal = ({ onRestart }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <Clock className="w-16 h-16 mx-auto text-red-500" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Time's Up!</h2>
        <p className="text-gray-600 mb-8">
          You've run out of time. Would you like to try again?
        </p>
        <button
          onClick={onRestart}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Try Again
        </button>
      </div>
    </div>
  );
};