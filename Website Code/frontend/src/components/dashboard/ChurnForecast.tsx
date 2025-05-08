import React, { useEffect, useState } from 'react';
import { getOttDashboardData, getBankDashboardData } from '../../services/dashboardService';

const ChurnForecast: React.FC = () => {
  const [ottData, setOttData] = useState<any>(null);
  const [bankData, setBankData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const ottResponse = await getOttDashboardData();
        const bankResponse = await getBankDashboardData();
        setOttData(ottResponse);
        setBankData(bankResponse);
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-2 gap-6 p-4">
      <div className="card">
        <h2 className="text-xl font-semibold">OTT Churn Forecast</h2>
        <p>Churn Rate: {ottData?.churn_rate}%</p>
        <p>Active Subscribers: {ottData?.active_subscribers}</p>
        <p>Total Subscribers: {ottData?.total_subscribers}</p>
        <p>Avg Support Tickets: {ottData?.support_tickets_avg}</p>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold">Bank Churn Forecast</h2>
        <p>Churn Rate: {bankData?.churn_rate}%</p>
        <p>Active Customers: {bankData?.active_customers}</p>
        <p>Total Customers: {bankData?.total_customers}</p>
        <p>Avg Products: {JSON.stringify(bankData?.product_distribution)}</p>
      </div>
    </div>
  );
};

export default ChurnForecast;
