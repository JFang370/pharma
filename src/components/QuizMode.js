// src/components/QuizMode.js
import { useState, useEffect } from 'react';
import QuizQuestion from './QuizQuestion';
import ScoreTracker from './ScoreTracker';
import QuizResult from './QuizResult';

const QuizMode = () => {
  const [drugData, setDrugData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Load drug data
  useEffect(() => {
    import('../data/drugData').then(module => {
      const allDrugs = module.default;
      // Shuffle all drugs for randomized quiz order
      const shuffled = [...allDrugs].sort(() => 0.5 - Math.random());
      setDrugData(shuffled);
    });
  }, []);

  const handleSubmit = () => {
    if (!selectedAnswer || !drugData[currentIndex]) return;
    
    setTotalAttempted(totalAttempted + 1);
    const isCorrect = selectedAnswer === drugData[currentIndex].generic;
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    setSelectedAnswer('');
    setShowAnswer(false);
    
    if (currentIndex < drugData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    // Reshuffle drug data
    import('../data/drugData').then(module => {
      const allDrugs = module.default;
      const shuffled = [...allDrugs].sort(() => 0.5 - Math.random());
      setDrugData(shuffled);
    });
    
    setCurrentIndex(0);
    setSelectedAnswer('');
    setShowAnswer(false);
    setScore(0);
    setTotalAttempted(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return <QuizResult score={score} totalAttempted={totalAttempted} onReset={resetQuiz} />;
  }

  if (drugData.length === 0) {
    return <div className="text-center p-4">Loading quiz questions...</div>;
  }

  return (
    <div className="quiz-container">
      <QuizQuestion 
        currentDrug={drugData[currentIndex]}
        onAnswerSubmit={handleSubmit}
        onNextQuestion={nextQuestion}
        showAnswer={showAnswer}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
      
      <ScoreTracker 
        currentIndex={currentIndex}
        totalQuestions={drugData.length}
        score={score}
        totalAttempted={totalAttempted}
        onReset={resetQuiz}
      />
    </div>
  );
};

export default QuizMode;