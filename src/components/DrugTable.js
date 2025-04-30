// src/components/DrugTable.js
const DrugTable = ({ drugs }) => {
  return (
    <div className="h-96 overflow-y-auto border rounded-md">
      <table className="min-w-full">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            <th className="p-2 border-b text-left">Brand</th>
            <th className="p-2 border-b text-left">Generic</th>
            <th className="p-2 border-b text-left">Class</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="p-2 border-b">{drug.brand}</td>
              <td className="p-2 border-b">{drug.generic}</td>
              <td className="p-2 border-b">{drug.drugClass}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DrugTable;