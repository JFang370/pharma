// src/components/QuizResult.js
const QuizResult = ({ score, totalAttempted, onReset }) => {
  const percentage = totalAttempted > 0 ? Math.round((score / totalAttempted) * 100) : 0;
  
  return (
    <div className="text-center p-6 bg-blue-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
      <p className="text-3xl font-bold mb-2">{score} / {totalAttempted}</p>
      <p className="text-xl mb-4">{percentage}% Correct</p>
      
      <div className="mb-6">
        {percentage >= 90 ? (
          <p className="text-green-600">Excellent! You have a strong knowledge of drug names.</p>
        ) : percentage >= 70 ? (
          <p className="text-blue-600">Good job! Keep studying to improve your knowledge.</p>
        ) : percentage >= 50 ? (
          <p className="text-yellow-600">You're making progress. Review the drug names again.</p>
        ) : (
          <p className="text-red-600">More study is needed. Try switching to Review Mode.</p>
        )}
      </div>
      
      <div className="flex justify-center space-x-4">
        <button
          onClick={onReset}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizResult;