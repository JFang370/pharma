// src/App.js
import { useState } from 'react';
import QuizMode from './components/QuizMode';
import ReviewMode from './components/ReviewMode';

function App() {
  const [quizMode, setQuizMode] = useState('quiz'); // 'quiz' or 'review'

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Drug Name Study Quiz</h1>
      
      <div className="mb-4 flex space-x-2">
        <button 
          className={`px-4 py-2 rounded-md ${quizMode === 'quiz' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setQuizMode('quiz')}>
          Quiz Mode
        </button>
        <button 
          className={`px-4 py-2 rounded-md ${quizMode === 'review' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setQuizMode('review')}>
          Review Mode
        </button>
      </div>

      {quizMode === 'quiz' ? <QuizMode /> : <ReviewMode />}
    </div>
  );
}

export default App;