// src/components/ScoreTracker.js
const ScoreTracker = ({ currentIndex, totalQuestions, score, totalAttempted, onReset }) => {
  const percentage = totalAttempted > 0 ? Math.round((score / totalAttempted) * 100) : 0;
  
  return (
    <div className="flex justify-between items-center mt-6">
      <p className="text-sm">Question {currentIndex + 1} of {totalQuestions}</p>
      <p className="font-medium">Score: {score}/{totalAttempted} ({percentage}%)</p>
      <button 
        onClick={onReset}
        className="text-sm text-blue-600 hover:underline">
        Reset Quiz
      </button>
    </div>
  );
};

export default ScoreTracker;