import React, { useState } from 'react';
import { useChurn } from '../../context/ChurnContext';
import { getPrediction } from '../../services/predictionService';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const PredictionForm: React.FC = () => {
  const churn = useChurn();
  const addPredictionResult = churn.addPredictionResult;

  const [modelType, setModelType] = useState<string>('ott');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Separate states for OTT and Bank
  const [ottFormData, setOttFormData] = useState<Record<string, any>>({});
  const [bankFormData, setBankFormData] = useState<Record<string, any>>({});

  // Define form fields
  const ottFields = {
    gender: "Male=0, Female=1",
    age: "Range: 13-100",
    no_of_days_subscribed: "Days Subscribed",
    multi_screen: "0 = No, 1 = Yes",
    mail_subscribed: "0 = No, 1 = Yes",
    weekly_mins_watched: "Weekly Watch Time",
    customer_support_calls: "Number of Calls"
  };

  const bankFields = {
    creditscore: "Range: 300-900",
    geography: "0 = France, 1 = Germany, 2 = Spain",
    gender: "Male=0, Female=1",
    age: "Range: 18-100",
    tenure: "Years Subscribed",
    balance: "Account Balance",
    numofproducts: "Number of Products",
    hascrcard: "0 = No, 1 = Yes",
    isactivemember: "0 = No, 1 = Yes",
    estimatedsalary: "Estimated Salary"
  };

  // 🛠️ **Handle Model Change**
  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setModelType(e.target.value);
    setError(null);

    // Clear the form data based on switch
    if (e.target.value === 'ott') {
      setBankFormData({});
    } else {
      setOttFormData({});
    }
  };

  // 🛠️ **Handle Input Change**
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (modelType === 'ott') {
      setOttFormData((prev) => ({
        ...prev,
        [name]: value === '' ? '' : parseFloat(value)
      }));
    } else {
      setBankFormData((prev) => ({
        ...prev,
        [name]: value === '' ? '' : parseFloat(value)
      }));
    }
  };

  // 🛠️ **Submit Handler**
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = modelType === 'ott' ? '/predict-ott' : '/predict-bank';
      const payload = modelType === 'ott' ? ottFormData : bankFormData;

      console.log("🔄 Sending Payload:", payload);
      const result = await getPrediction(endpoint, payload);

      console.log("📌 Prediction Result:", result);

      // ✅ Send to context for display
      addPredictionResult({
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        modelType: modelType === 'ott' ? 'OTT' : 'Bank',
        prediction: result.prediction,
        probability: result.probability,
        confidence: result.probability > 50 ? 'High' : 'Low'
      });

    } catch (err) {
      console.error("Error during prediction:", err);
      setError('An error occurred while making the prediction. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render the form
  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl bg-white shadow rounded">
      <div>
        <label>Select Model Type</label>
        <select onChange={handleModelChange} value={modelType} className="input w-full mt-2">
          <option value="ott">OTT Prediction</option>
          <option value="bank">Bank Prediction</option>
        </select>
      </div>

      {modelType === 'ott' ? (
        <>
          <h2 className="text-lg font-semibold mb-4 mt-4">📌 OTT Information</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(ottFields).map((field, idx) => (
              <div key={idx}>
                <label className="flex items-center">
                  {field.replace(/_/g, ' ')}
                  <InformationCircleIcon className="ml-1 w-4 h-4 text-gray-400" title={ottFields[field]} />
                </label>
                <input 
                  type="number" 
                  name={field} 
                  placeholder={`Enter ${field}`} 
                  value={ottFormData[field] !== undefined ? ottFormData[field] : ''} 
                  onChange={handleChange} 
                  className="input w-full mt-2" 
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-4 mt-4">📌 Bank Information</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(bankFields).map((field, idx) => (
              <div key={idx}>
                <label className="flex items-center">
                  {field.replace(/_/g, ' ')}
                  <InformationCircleIcon className="ml-1 w-4 h-4 text-gray-400" title={bankFields[field]} />
                </label>
                <input 
                  type="number" 
                  name={field} 
                  placeholder={`Enter ${field}`} 
                  value={bankFormData[field] !== undefined ? bankFormData[field] : ''} 
                  onChange={handleChange} 
                  className="input w-full mt-2" 
                />
              </div>
            ))}
          </div>
        </>
      )}

      <button type="submit" disabled={loading} className="btn btn-primary w-full mt-6">Submit Prediction</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default PredictionForm;
