// src/components/QuizQuestion.js
import { useState, useEffect } from 'react';

const QuizQuestion = ({ 
  currentDrug, 
  onAnswerSubmit, 
  onNextQuestion, 
  showAnswer, 
  selectedAnswer, 
  setSelectedAnswer 
}) => {
  const [options, setOptions] = useState([]);

  // Helper function to shuffle array
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Generate answer options when current drug changes
  useEffect(() => {
    if (!currentDrug) return;
    
    // Import in the component since it's used only here
    import('../data/drugData').then(module => {
      const drugData = module.default;
      
      // Get the correct answer
      const correctAnswer = currentDrug.generic;
      
      // Get 3 random incorrect answers from the drug data
      let incorrectOptions = [];
      const allGenerics = drugData.map(drug => drug.generic);
      
      while (incorrectOptions.length < 3) {
        const randomIndex = Math.floor(Math.random() * drugData.length);
        const randomGeneric = drugData[randomIndex].generic;
        
        if (randomGeneric !== correctAnswer && !incorrectOptions.includes(randomGeneric)) {
          incorrectOptions.push(randomGeneric);
        }
      }
      
      // Combine correct and incorrect answers and shuffle
      let allOptions = [correctAnswer, ...incorrectOptions];
      allOptions = shuffleArray(allOptions);
      
      setOptions(allOptions);
    });
  }, [currentDrug]);

  if (!currentDrug) return null;

  return (
    <>
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="font-bold">Brand Name: <span className="text-blue-700">{currentDrug.brand}</span></p>
        <p>Drug Class: {currentDrug.drugClass}</p>
        <p>Purpose: {currentDrug.purpose}</p>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Select the Generic Name:</label>
        <div className="space-y-2">
          {options.map((option, idx) => (
            <div 
              key={idx} 
              className={`p-3 border rounded-md cursor-pointer ${
                selectedAnswer === option ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
              } ${
                showAnswer && option === currentDrug.generic ? 'bg-green-100 border-green-500' : ''
              } ${
                showAnswer && selectedAnswer === option && option !== currentDrug.generic ? 'bg-red-100 border-red-500' : ''
              }`}
              onClick={() => !showAnswer && setSelectedAnswer(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mb-6">
        {!showAnswer ? (
          <button 
            onClick={onAnswerSubmit}
            disabled={!selectedAnswer}
            className={`px-6 py-2 rounded-md ${!selectedAnswer ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 text-white'}`}>
            Submit Answer
          </button>
        ) : (
          <button 
            onClick={onNextQuestion}
            className="bg-blue-600 text-white px-6 py-2 rounded-md">
            Next Question
          </button>
        )}
      </div>

      {showAnswer && (
        <div className={`p-4 mb-4 rounded-lg ${selectedAnswer === currentDrug.generic ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <p className="font-bold text-center">
            {selectedAnswer === currentDrug.generic 
              ? 'Correct!'
              : `Incorrect. The correct answer is: ${currentDrug.generic}`}
          </p>
        </div>
      )}
    </>
  );
};

export default QuizQuestion;