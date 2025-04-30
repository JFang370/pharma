// src/components/ReviewMode.js
import { useState } from 'react';
import drugData from '../data/drugData';
import DrugTable from './DrugTable';

function ReviewMode() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrugs = drugData.filter(drug => 
    drug.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
    drug.generic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drug.drugClass.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="review-container">
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border p-2 rounded-md"
          placeholder="Search by brand name, generic name, or drug class"
        />
      </div>

      <DrugTable drugs={filteredDrugs} />
    </div>
  );
}

export default ReviewMode;