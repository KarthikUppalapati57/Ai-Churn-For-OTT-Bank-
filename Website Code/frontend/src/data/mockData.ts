import { ChurnData, CustomerData } from '../types';

// Generate mock time series data for the last 12 months
const generateTimeSeriesData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const churnRate = 5 + Math.random() * 3; // 5-8%
    const newCustomers = Math.floor(800 + Math.random() * 400); // 800-1200
    const totalCustomers = 10000 + i * 200 + Math.floor(Math.random() * 500);
    
    data.push({
      date: date.toISOString().split('T')[0],
      churnRate,
      newCustomers,
      totalCustomers
    });
  }
  
  return data;
};

// Mock churn data for the dashboard
export const mockChurnData: ChurnData = {
  churnRate: 6.8,
  churnRateTrend: -0.5,
  customersAtRisk: 342,
  customersAtRiskTrend: 12,
  retentionRate: 93.2,
  retentionRateTrend: 0.5,
  avgCustomerLifetime: 18,
  avgCustomerLifetimeTrend: 1.5,
  revenueImpact: 127500,
  revenueImpactTrend: -5,
  
  timeSeriesData: generateTimeSeriesData(),
  
  churnReasons: [
    { reason: 'Price Sensitivity', percentage: 35 },
    { reason: 'Poor Customer Service', percentage: 25 },
    { reason: 'Better Competitor Offer', percentage: 20 },
    { reason: 'Product Issues', percentage: 15 },
    { reason: 'Other', percentage: 5 }
  ],
  
  churnBySegment: [
    { segment: 'New Users', churnRate: 9.2, customerCount: 1250 },
    { segment: 'Regular Users', churnRate: 6.4, customerCount: 5840 },
    { segment: 'Power Users', churnRate: 4.1, customerCount: 2320 },
    { segment: 'Premium Users', churnRate: 3.2, customerCount: 1590 }
  ],
  
  churnPrediction: [
    { month: 'Jan', predicted: 6.2, actual: 6.5 },
    { month: 'Feb', predicted: 6.7, actual: 6.9 },
    { month: 'Mar', predicted: 7.1, actual: 6.8 },
    { month: 'Apr', predicted: 6.5, actual: 6.3 },
    { month: 'May', predicted: 6.2, actual: 6.4 },
    { month: 'Jun', predicted: 5.9, actual: 5.8 },
    { month: 'Jul', predicted: 6.1, actual: 5.9 },
    { month: 'Aug', predicted: 5.8, actual: 6.0 },
    { month: 'Sep', predicted: 6.0, actual: 6.2 },
    { month: 'Oct', predicted: 6.3, actual: 6.5 },
    { month: 'Nov', predicted: 6.5, actual: 6.8 },
    { month: 'Dec', predicted: 6.8 }
  ]
};

// Mock customer data
const generateCustomers = (count: number): CustomerData[] => {
  const customers = [];
  const segments = ['New Users', 'Regular Users', 'Power Users', 'Premium Users'];
  const statuses: ['active', 'at risk', 'churned'] = ['active', 'at risk', 'churned'];
  const subscriptionTiers = ['Basic', 'Standard', 'Premium', 'Enterprise'];
  
  for (let i = 0; i < count; i++) {
    const riskScore = Math.random() * 100;
    let status: 'active' | 'at risk' | 'churned';
    
    if (riskScore > 70) {
      status = 'at risk';
    } else if (riskScore > 90) {
      status = 'churned';
    } else {
      status = 'active';
    }
    
    const joinDate = new Date();
    joinDate.setMonth(joinDate.getMonth() - Math.floor(Math.random() * 24)); // 0-24 months ago
    
    const lastActivity = new Date();
    if (status === 'churned') {
      lastActivity.setMonth(lastActivity.getMonth() - Math.floor(Math.random() * 3)); // 0-3 months ago
    } else {
      lastActivity.setDate(lastActivity.getDate() - Math.floor(Math.random() * 30)); // 0-30 days ago
    }
    
    customers.push({
      id: `CUST-${10000 + i}`,
      name: `Customer ${10000 + i}`,
      email: `customer${10000 + i}@example.com`,
      segment: segments[Math.floor(Math.random() * segments.length)],
      churnRisk: Math.round(riskScore),
      status,
      lifetimeValue: Math.round(100 + Math.random() * 900),
      joinDate: joinDate.toISOString().split('T')[0],
      lastActivity: lastActivity.toISOString().split('T')[0],
      subscriptionTier: subscriptionTiers[Math.floor(Math.random() * subscriptionTiers.length)]
    });
  }
  
  return customers;
};

export const mockCustomerData = generateCustomers(100);