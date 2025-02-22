import React, { useState, useEffect, useCallback } from 'react';
import { Brain, Timer as TimerIcon } from 'lucide-react';
import { questions } from '././Data/questions';
import { Timer } from './Components/Timer';
import { QuizComplete } from './Components/QuizComplete';
import { QuizHistory } from './Components/QuizHistory';
import { TimeUpModal } from './Components/TimeUpModal';

const TIME_PER_QUESTION = 30;
const TOTAL_QUIZ_TIME = 30 * 60;

function App() {
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    answers: [],
    timeRemaining: TIME_PER_QUESTION,
    isComplete: false,
    score: 0,
  });

  const [totalTimeRemaining, setTotalTimeRemaining] = useState(TOTAL_QUIZ_TIME);
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);
  const [integerAnswer, setIntegerAnswer] = useState('');

  const resetQuiz = useCallback(() => {
    setQuizState({
      currentQuestionIndex: 0,
      answers: [],
      timeRemaining: TIME_PER_QUESTION,
      isComplete: false,
      score: 0,
    });
    setTotalTimeRemaining(TOTAL_QUIZ_TIME);
    setShowTimeUpModal(false);
    setIntegerAnswer('');
  }, []);

  useEffect(() => {
    if (quizState.isComplete || showTimeUpModal) return;

    const timer = setInterval(() => {
      setTotalTimeRemaining((prev) => {
        if (prev <= 0) {
          setShowTimeUpModal(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState.isComplete, showTimeUpModal]);

  useEffect(() => {
    if (quizState.isComplete || showTimeUpModal) return;

    const timer = setInterval(() => {
      setQuizState((prev) => {
        if (prev.timeRemaining <= 0) {
          const isLastQuestion = prev.currentQuestionIndex === questions.length - 1;
          
          if (isLastQuestion) {
            return {
              ...prev,
              isComplete: true,
            };
          }

          return {
            ...prev,
            currentQuestionIndex: prev.currentQuestionIndex + 1,
            timeRemaining: TIME_PER_QUESTION,
          };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState.isComplete, showTimeUpModal]);

  const handleMultipleChoiceAnswer = (answerIndex) => {
    const currentQuestion = questions[quizState.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    setQuizState((prev) => {
      const newAnswers = [...prev.answers, answerIndex];
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const isLastQuestion = prev.currentQuestionIndex === questions.length - 1;

      if (isLastQuestion) {
        return {
          ...prev,
          answers: newAnswers,
          score: newScore,
          isComplete: true,
        };
      }

      return {
        ...prev,
        answers: newAnswers,
        score: newScore,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        timeRemaining: TIME_PER_QUESTION,
      };
    });
  };

  const handleIntegerAnswer = (e) => {
    e.preventDefault();
    const currentQuestion = questions[quizState.currentQuestionIndex];
    const userAnswer = parseInt(integerAnswer, 10);
    const isCorrect = userAnswer === currentQuestion.correctAnswer;

    setQuizState((prev) => {
      const newAnswers = [...prev.answers, userAnswer];
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const isLastQuestion = prev.currentQuestionIndex === questions.length - 1;

      if (isLastQuestion) {
        return {
          ...prev,
          answers: newAnswers,
          score: newScore,
          isComplete: true,
        };
      }

      return {
        ...prev,
        answers: newAnswers,
        score: newScore,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        timeRemaining: TIME_PER_QUESTION,
      };
    });
    setIntegerAnswer('');
  };

  if (quizState.isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <QuizComplete
            score={quizState.score}
            totalQuestions={questions.length}
            onRestart={resetQuiz}
            timePerQuestion={TIME_PER_QUESTION}
          />
          <QuizHistory />
        </div>
      </div>
    );
  }

  const currentQuestion = questions[quizState.currentQuestionIndex];
  const minutes = Math.floor(totalTimeRemaining / 60);
  const seconds = totalTimeRemaining % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {showTimeUpModal && <TimeUpModal onRestart={resetQuiz} />}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Interactive Quiz
              </h1>
            </div>
            <div className={`flex items-center gap-3 px-4 py-2 rounded-lg border transition-colors duration-300 ${
              totalTimeRemaining <= 300 
                ? 'bg-red-50 border-red-100' 
                : 'bg-blue-50 border-blue-100'
            }`}>
              <TimerIcon className={`w-5 h-5 ${
                totalTimeRemaining <= 300 ? 'text-red-500' : 'text-blue-500'
              }`} />
              <span className={`text-lg font-semibold ${
                totalTimeRemaining <= 300 ? 'text-red-600' : 'text-blue-600'
              }`}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <Timer
              timeRemaining={quizState.timeRemaining}
              totalTime={TIME_PER_QUESTION}
            />
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Question {quizState.currentQuestionIndex + 1} of {questions.length}
              </span>
              <div className="h-1 flex-1 bg-blue-100 rounded-full">
                <div 
                  className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                  style={{ width: `${((quizState.currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">{currentQuestion.question}</h2>
            
            {currentQuestion.type === 'multiple-choice' ? (
              <div className="grid gap-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleMultipleChoiceAnswer(index)}
                    className="group text-left p-4 rounded-xl border-2 border-gray-200 hover:border-transparent hover:ring-2 hover:ring-blue-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 transition-all duration-300"
                  >
                    <span className="flex items-center gap-3 text-gray-700 group-hover:text-white transition-colors">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-semibold group-hover:bg-white/20 group-hover:text-white transition-colors">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <form onSubmit={handleIntegerAnswer} className="space-y-4">
                <input
                  type="number"
                  value={integerAnswer}
                  onChange={(e) => setIntegerAnswer(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300 text-lg"
                  placeholder="Enter your numerical answer"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl hover:opacity-90 transition-opacity duration-300 text-lg font-semibold"
                >
                  Submit Answer
                </button>
              </form>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-gray-500">Current Score:</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
              {quizState.score}/{quizState.currentQuestionIndex}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;