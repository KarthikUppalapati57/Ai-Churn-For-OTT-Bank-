import React from 'react';
import { useChurn } from '../context/ChurnContext';
import MetricCard from '../components/dashboard/MetricCard';
import ChurnTrend from '../components/dashboard/ChurnTrend';
import ChurnReasons from '../components/dashboard/ChurnReasons';
import SegmentAnalysis from '../components/dashboard/SegmentAnalysis';
import ChurnForecast from '../components/dashboard/ChurnForecast';
import FilterBar from '../components/dashboard/FilterBar';
import { 
  ArrowTrendingDownIcon, 
  UserGroupIcon, 
  ArrowTrendingUpIcon, 
  ClockIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const { churnData } = useChurn();

  return (
    <div>
      <FilterBar />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
        <MetricCard
          title="Churn Rate"
          value={churnData.churnRate}
          trend={churnData.churnRateTrend}
          icon={ArrowTrendingDownIcon}
          isPercentage={true}
          description="Monthly customer churn rate"
        />
        
        <MetricCard
          title="Customers at Risk"
          value={churnData.customersAtRisk}
          trend={churnData.customersAtRiskTrend}
          icon={UserGroupIcon}
          description="Predicted to churn within 30 days"
        />
        
        <MetricCard
          title="Retention Rate"
          value={churnData.retentionRate}
          trend={churnData.retentionRateTrend}
          icon={ArrowTrendingUpIcon}
          isPercentage={true}
          description="Monthly customer retention"
        />
        
        <MetricCard
          title="Avg. Customer Lifetime"
          value={churnData.avgCustomerLifetime}
          trend={churnData.avgCustomerLifetimeTrend}
          icon={ClockIcon}
          description="Average months as customer"
        />
        
        <MetricCard
          title="Revenue Impact"
          value={churnData.revenueImpact}
          trend={churnData.revenueImpactTrend}
          icon={CurrencyDollarIcon}
          isCurrency={true}
          description="Projected monthly revenue loss"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-3">
          <ChurnTrend data={churnData.timeSeriesData} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <ChurnReasons data={churnData.churnReasons} />
        <SegmentAnalysis data={churnData.churnBySegment} />
        <ChurnForecast data={churnData.churnPrediction} />
      </div>
      
      <div className="card p-6 mb-6 animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4">Churn Reduction Strategies</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg border border-primary-100 bg-primary-50 p-4">
            <h3 className="font-medium text-primary-800 mb-2">Immediate Actions</h3>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li className="flex items-start">
                <span className="h-5 w-5 text-primary-600 mr-2">•</span>
                <span>Contact high-value customers showing churn signals</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 text-primary-600 mr-2">•</span>
                <span>Offer personalized retention incentives to at-risk segments</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 text-primary-600 mr-2">•</span>
                <span>Address service issues for customers with recent complaints</span>
              </li>
            </ul>
          </div>
          
          <div className="rounded-lg border border-primary-100 bg-primary-50 p-4">
            <h3 className="font-medium text-primary-800 mb-2">Medium-Term Strategy</h3>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li className="flex items-start">
                <span className="h-5 w-5 text-primary-600 mr-2">•</span>
                <span>Implement enhanced onboarding for new customer segments</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 text-primary-600 mr-2">•</span>
                <span>Develop loyalty programs targeting price-sensitive customers</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 text-primary-600 mr-2">•</span>
                <span>Improve customer success touchpoints at critical journey stages</span>
              </li>
            </ul>
          </div>
          
          <div className="rounded-lg border border-primary-100 bg-primary-50 p-4">
            <h3 className="font-medium text-primary-800 mb-2">Long-Term Initiatives</h3>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li className="flex items-start">
                <span className="h-5 w-5 text-primary-600 mr-2">•</span>
                <span>Enhance product features based on churned customer feedback</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 text-primary-600 mr-2">•</span>
                <span>Create more affordable entry-level options for price-sensitive segments</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 text-primary-600 mr-2">•</span>
                <span>Develop predictive AI models for earlier churn identification</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;