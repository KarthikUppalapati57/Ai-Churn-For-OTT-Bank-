import React from 'react';
import { ChartPieIcon, UserGroupIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { useChurn } from '../../context/ChurnContext';

const CustomerInsights: React.FC = () => {
  const { customerData } = useChurn();
  
  // Calculate insights
  const totalCustomers = customerData.length;
  const activeCustomers = customerData.filter(c => c.status === 'active').length;
  const atRiskCustomers = customerData.filter(c => c.status === 'at risk').length;
  const churnedCustomers = customerData.filter(c => c.status === 'churned').length;
  
  const activePercentage = Math.round((activeCustomers / totalCustomers) * 100);
  const atRiskPercentage = Math.round((atRiskCustomers / totalCustomers) * 100);
  const churnedPercentage = Math.round((churnedCustomers / totalCustomers) * 100);
  
  const totalLTV = customerData.reduce((sum, customer) => sum + customer.lifetimeValue, 0);
  const avgLTV = Math.round(totalLTV / totalCustomers);
  
  const avgLTVActive = Math.round(
    customerData
      .filter(c => c.status === 'active')
      .reduce((sum, customer) => sum + customer.lifetimeValue, 0) / activeCustomers
  );
  
  const avgLTVAtRisk = Math.round(
    customerData
      .filter(c => c.status === 'at risk')
      .reduce((sum, customer) => sum + customer.lifetimeValue, 0) / atRiskCustomers
  );
  
  const potentialLossAmount = atRiskCustomers * avgLTVAtRisk;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="card animate-fadeIn">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-primary-50">
            <UserGroupIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
          </div>
          <h3 className="ml-3 text-lg font-medium text-neutral-900">Customer Status Overview</h3>
        </div>
        
        <div className="mt-4 bg-neutral-50 p-4 rounded-lg">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-medium text-neutral-700">Active</div>
                <div className="text-sm font-medium text-success-700">{activeCustomers} ({activePercentage}%)</div>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-success-500 h-2 rounded-full" style={{ width: `${activePercentage}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-medium text-neutral-700">At Risk</div>
                <div className="text-sm font-medium text-warning-700">{atRiskCustomers} ({atRiskPercentage}%)</div>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-warning-500 h-2 rounded-full" style={{ width: `${atRiskPercentage}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-medium text-neutral-700">Churned</div>
                <div className="text-sm font-medium text-danger-700">{churnedCustomers} ({churnedPercentage}%)</div>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-danger-500 h-2 rounded-full" style={{ width: `${churnedPercentage}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Key Insights</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="h-5 w-5 text-primary-600 mr-2">•</span>
              <span>{activePercentage}% of customers are currently active and engaged.</span>
            </li>
            <li className="flex items-start">
              <span className="h-5 w-5 text-warning-600 mr-2">•</span>
              <span>{atRiskPercentage}% of customers show signs of potential churn and need attention.</span>
            </li>
            <li className="flex items-start">
              <span className="h-5 w-5 text-danger-600 mr-2">•</span>
              <span>Historical churn rate is {churnedPercentage}% based on the customer database.</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="card animate-fadeIn">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-primary-50">
            <CurrencyDollarIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
          </div>
          <h3 className="ml-3 text-lg font-medium text-neutral-900">Customer Value Assessment</h3>
        </div>
        
        <div className="mt-4 grid grid-cols-1 gap-4">
          <div className="bg-neutral-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-neutral-700 mb-1">Average Lifetime Value</div>
            <div className="text-2xl font-bold text-primary-700">${avgLTV}</div>
            <div className="mt-1 text-sm text-neutral-500">Per customer across all segments</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-success-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-success-700 mb-1">Active Customer LTV</div>
              <div className="text-2xl font-bold text-success-700">${avgLTVActive}</div>
              <div className="mt-1 text-sm text-success-600">Per active customer</div>
            </div>
            
            <div className="bg-warning-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-warning-700 mb-1">At-Risk Value</div>
              <div className="text-2xl font-bold text-warning-700">${avgLTVAtRisk}</div>
              <div className="mt-1 text-sm text-warning-600">Per at-risk customer</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 bg-danger-50 p-4 rounded-lg border border-danger-100">
          <div className="flex items-center mb-2">
            <ChartPieIcon className="h-5 w-5 text-danger-600 mr-2" />
            <h4 className="text-sm font-semibold text-danger-700">Potential Revenue at Risk</h4>
          </div>
          <div className="text-2xl font-bold text-danger-700">${potentialLossAmount.toLocaleString()}</div>
          <div className="mt-1 text-sm text-danger-600">Total value from customers at risk of churning</div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Recommended Actions</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="h-5 w-5 text-primary-600 mr-2">•</span>
              <span>Implement targeted retention campaigns for highest value at-risk customers.</span>
            </li>
            <li className="flex items-start">
              <span className="h-5 w-5 text-primary-600 mr-2">•</span>
              <span>Reach out to customers with high LTV and increasing churn risk scores.</span>
            </li>
            <li className="flex items-start">
              <span className="h-5 w-5 text-primary-600 mr-2">•</span>
              <span>Analyze churn patterns to identify common exit points in the customer journey.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerInsights;