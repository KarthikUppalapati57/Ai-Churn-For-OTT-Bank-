import React from 'react';
import CustomerInsights from '../components/customers/CustomerInsights';
import CustomerTable from '../components/customers/CustomerTable';

const Customers: React.FC = () => {
  return (
    <div>
      <CustomerInsights />
      <CustomerTable />
    </div>
  );
};

export default Customers;