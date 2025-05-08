// Dashboard data types
export interface ChurnData {
  churnRate: number;
  churnRateTrend: number;
  customersAtRisk: number;
  customersAtRiskTrend: number;
  retentionRate: number;
  retentionRateTrend: number;
  avgCustomerLifetime: number;
  avgCustomerLifetimeTrend: number;
  revenueImpact: number;
  revenueImpactTrend: number;
  timeSeriesData: TimeSeriesPoint[];
  churnReasons: ChurnReason[];
  churnBySegment: ChurnSegment[];
  churnPrediction: ChurnPrediction[];
}

export interface TimeSeriesPoint {
  date: string;
  churnRate: number;
  newCustomers: number;
  totalCustomers: number;
}

export interface ChurnReason {
  reason: string;
  percentage: number;
}

export interface ChurnSegment {
  segment: string;
  churnRate: number;
  customerCount: number;
}

export interface ChurnPrediction {
  month: string;
  predicted: number;
  actual?: number;
}

// Customer data types
export interface CustomerData {
  id: string;
  name: string;
  email: string;
  segment: string;
  churnRisk: number;
  status: 'active' | 'at risk' | 'churned';
  lifetimeValue: number;
  joinDate: string;
  lastActivity: string;
  subscriptionTier: string;
}

// Model types
export interface BankCustomerFeatures {
  creditScore: number;
  age: number;
  tenure: number;
  balance: number;
  numOfProducts: number;
  hasCard: boolean;
  isActiveMember: boolean;
  estimatedSalary: number;
  countryGermany: boolean;
  countrySpain: boolean;
  countryFrance: boolean;
  genderMale: boolean;
}

export interface OttCustomerFeatures {
  subscriptionLength: number;
  monthlyCharge: number;
  contentDownloaded: number;
  devicesRegistered: number;
  ageGroup: string;
  planBasic: boolean;
  planStandard: boolean;
  planPremium: boolean;
  paymentTypeCreditCard: boolean;
  paymentTypeDebitCard: boolean;
  paymentTypeEWallet: boolean;
  genrePreferenceDrama: boolean;
  genrePreferenceAction: boolean;
  genrePreferenceComedy: boolean;
  genrePreferenceSciFi: boolean;
}

export interface PredictionResult {
  id: string;
  date: string;
  modelType: 'ott' | 'bank';
  features: OttCustomerFeatures | BankCustomerFeatures;
  prediction: number;
  probability: number;
  confidence: 'Low' | 'Moderate' | 'High';
}

// Chart types
export interface ChartOptions {
  [key: string]: any;
}

export interface ChartSeries {
  name: string;
  data: number[] | { x: string | number; y: number }[];
}