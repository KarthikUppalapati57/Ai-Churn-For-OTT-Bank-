import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ChurnData, CustomerData, PredictionResult } from '../types';
import { mockChurnData, mockCustomerData } from '../data/mockData';

interface ChurnContextType {
  churnData: ChurnData;
  customerData: CustomerData[];
  predictionResults: PredictionResult[];
  timeRange: string;
  setTimeRange: (range: string) => void;
  industry: string;
  setIndustry: (industry: string) => void;
  addPredictionResult: (result: PredictionResult) => void;
}

const ChurnContext = createContext<ChurnContextType | undefined>(undefined);

export const ChurnProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [churnData, setChurnData] = useState<ChurnData>(mockChurnData);
  const [customerData, setCustomerData] = useState<CustomerData[]>(mockCustomerData);
  const [predictionResults, setPredictionResults] = useState<PredictionResult[]>([]);
  const [timeRange, setTimeRange] = useState<string>('30d');
  const [industry, setIndustry] = useState<string>('ott');

  const addPredictionResult = (result: PredictionResult) => {
    setPredictionResults((prev) => [result, ...prev]);
  };

  return (
    <ChurnContext.Provider
      value={{
        churnData,
        customerData,
        predictionResults,
        timeRange,
        setTimeRange,
        industry,
        setIndustry,
        addPredictionResult,
      }}
    >
      {children}
    </ChurnContext.Provider>
  );
};

export const useChurn = () => {
  const context = useContext(ChurnContext);
  if (context === undefined) {
    throw new Error('useChurn must be used within a ChurnProvider');
  }
  return context;
};