import React, { useState, useEffect, useCallback } from 'react';
import { Brain } from 'lucide-react';
import { questions } from "././Data/questions";
import { Timer } from './Components/Timer';
import { QuizComplete } from './Components/QuizComplete';
import { QuizHistory } from './Components/QuizHistory';

const TIME_PER_QUESTION = 30;

function App() {
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    answers: [],
    timeRemaining: TIME_PER_QUESTION,
    isComplete: false,
    score: 0,
  });

  const resetQuiz = useCallback(() => {
    setQuizState({
      currentQuestionIndex: 0,
      answers: [],
      timeRemaining: TIME_PER_QUESTION,
      isComplete: false,
      score: 0,
    });
  }, []);

  useEffect(() => {
    if (quizState.isComplete) return;

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
  }, [quizState.isComplete]);

  const handleAnswer = (answerIndex) => {
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

  if (quizState.isComplete) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <Brain className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold">Interactive Quiz</h1>
          </div>

          <div className="mb-6">
            <Timer
              timeRemaining={quizState.timeRemaining}
              totalTime={TIME_PER_QUESTION}
            />
          </div>

          <div className="mb-8">
            <div className="text-sm text-gray-500 mb-2">
              Question {quizState.currentQuestionIndex + 1} of {questions.length}
            </div>
            <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="text-left p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-500">
            Current Score: {quizState.score}/{quizState.currentQuestionIndex}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;