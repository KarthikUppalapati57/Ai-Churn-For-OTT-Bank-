import React from 'react';
import PredictionForm from '../components/predictions/PredictionForm';
import PredictionResults from '../components/predictions/PredictionResults';

const Predictions: React.FC = () => {
  return (
    <div>
      <PredictionForm />
      <PredictionResults />
    </div>
  );
};

export default Predictions;