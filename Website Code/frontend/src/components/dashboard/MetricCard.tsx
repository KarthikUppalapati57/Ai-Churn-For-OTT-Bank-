import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend: number;
  icon: React.ElementType;
  isCurrency?: boolean;
  isPercentage?: boolean;
  description?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  icon: Icon,
  isCurrency = false,
  isPercentage = false,
  description
}) => {
  const formattedValue = () => {
    if (isCurrency) {
      return `$${typeof value === 'number' ? value.toLocaleString() : value}`;
    }
    if (isPercentage) {
      return `${value}%`;
    }
    return value;
  };

  const trendColor = trend > 0 
    ? (title.toLowerCase().includes('churn') ? 'text-danger-500' : 'text-success-500')
    : (title.toLowerCase().includes('churn') ? 'text-success-500' : 'text-danger-500');

  const trendBg = trend > 0
    ? (title.toLowerCase().includes('churn') ? 'bg-danger-50' : 'bg-success-50')
    : (title.toLowerCase().includes('churn') ? 'bg-success-50' : 'bg-danger-50');

  return (
    <div className="stat-card animate-fadeIn">
      <div className="flex items-center justify-between">
        <h3 className="text-neutral-600 text-sm font-medium">{title}</h3>
        <div className="p-2 rounded-lg bg-primary-50">
          <Icon className="h-5 w-5 text-primary-600" aria-hidden="true" />
        </div>
      </div>
      
      <div className="mt-2">
        <div className="flex items-baseline">
          <p className="text-2xl font-semibold text-neutral-900">{formattedValue()}</p>
          
          <div className="ml-2 flex items-center">
            <span className={`${trendColor} inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${trendBg}`}>
              {trend > 0 ? (
                <ArrowUpIcon className="-ml-0.5 mr-1 h-3 w-3 flex-shrink-0 self-center" aria-hidden="true" />
              ) : (
                <ArrowDownIcon className="-ml-0.5 mr-1 h-3 w-3 flex-shrink-0 self-center" aria-hidden="true" />
              )}
              {Math.abs(trend)}%
            </span>
          </div>
        </div>
      </div>
      
      {description && (
        <p className="mt-2 text-sm text-neutral-500">{description}</p>
      )}
    </div>
  );
};

export default MetricCard;