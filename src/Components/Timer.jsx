import React from 'react';
import { Timer as TimerIcon } from 'lucide-react';

const Timer = ({ timeRemaining, totalTime }) => {
  const percentage = (timeRemaining / totalTime) * 100;
  const isWarning = timeRemaining <= 10;

  return (
    <div className="flex items-center gap-2">
      <TimerIcon className={`w-5 h-5 ${isWarning ? 'text-red-500' : 'text-blue-500'}`} />
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${
            isWarning ? 'bg-red-500' : 'bg-blue-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={`font-mono ${isWarning ? 'text-red-500' : 'text-blue-500'}`}>
        {timeRemaining}s
      </span>
    </div>
  );
};

export default Timer;