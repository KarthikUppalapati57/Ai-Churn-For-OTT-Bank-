import React from 'react';
import { useChurn } from '../../context/ChurnContext';

const PredictionResults: React.FC = () => {
  const { predictionResults } = useChurn();

  if (predictionResults.length === 0) {
    return <div>No predictions yet.</div>;
  }

  return (
    <div className="card mt-6">
      <h2 className="text-lg font-semibold mb-4">📌 Prediction Results</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Model Type</th>
            <th>Prediction</th>
            <th>Churn Risk (%)</th>
            <th>Confidence Level</th>
          </tr>
        </thead>
        <tbody>
          {predictionResults.map((result) => (
            <tr key={result.id}>
              <td>{result.id}</td>
              <td>{result.date}</td>
              <td>{result.modelType}</td>
              <td>{result.prediction === 1 ? "Will Churn" : "Will Stay"}</td>
              <td>{result.probability}%</td>
              <td>{result.confidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionResults;
