import React from 'react';
import { useChurn } from '../../context/ChurnContext';

const FilterBar: React.FC = () => {
  const { timeRange, setTimeRange, industry, setIndustry } = useChurn();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-fadeIn">
      <div className="flex-1">
        <label htmlFor="industry" className="block text-sm font-medium text-neutral-700 mb-1">
          Industry
        </label>
        <select
          id="industry"
          name="industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="select"
        >
          <option value="ott">OTT Streaming</option>
          <option value="bank">Banking</option>
        </select>
      </div>
      
      <div className="flex-1">
        <label htmlFor="timeRange" className="block text-sm font-medium text-neutral-700 mb-1">
          Time Range
        </label>
        <select
          id="timeRange"
          name="timeRange"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="select"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
          <option value="6m">Last 6 Months</option>
          <option value="1y">Last Year</option>
        </select>
      </div>
      
      <div className="flex-1">
        <label htmlFor="segment" className="block text-sm font-medium text-neutral-700 mb-1">
          Customer Segment
        </label>
        <select
          id="segment"
          name="segment"
          className="select"
        >
          <option value="all">All Segments</option>
          <option value="new">New Users</option>
          <option value="regular">Regular Users</option>
          <option value="power">Power Users</option>
          <option value="premium">Premium Users</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;