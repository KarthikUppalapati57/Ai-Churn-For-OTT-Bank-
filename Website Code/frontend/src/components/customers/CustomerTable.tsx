import React, { useState } from 'react';
import { useChurn } from '../../context/ChurnContext';
import { CustomerData } from '../../types';

const CustomerTable: React.FC = () => {
  const { customerData } = useChurn();
  const [search, setSearch] = useState('');
  const [segment, setSegment] = useState('all');
  const [status, setStatus] = useState('all');
  
  const filteredCustomers = customerData.filter((customer) => {
    // Filter by search term
    const searchMatch = 
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.id.toLowerCase().includes(search.toLowerCase());
      
    // Filter by segment
    const segmentMatch = segment === 'all' || customer.segment === segment;
    
    // Filter by status
    const statusMatch = status === 'all' || customer.status === status;
    
    return searchMatch && segmentMatch && statusMatch;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'badge-success';
      case 'at risk':
        return 'badge-warning';
      case 'churned':
        return 'badge-danger';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getRiskIndicatorClass = (risk: number) => {
    if (risk >= 70) {
      return 'text-danger-500';
    } else if (risk >= 40) {
      return 'text-warning-500';
    } else {
      return 'text-success-500';
    }
  };

  return (
    <div className="card animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between mb-6">
        <h2 className="text-xl font-semibold">Customer Data</h2>
        
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-4">
          <div>
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={segment}
              onChange={(e) => setSegment(e.target.value)}
              className="select"
            >
              <option value="all">All Segments</option>
              <option value="New Users">New Users</option>
              <option value="Regular Users">Regular Users</option>
              <option value="Power Users">Power Users</option>
              <option value="Premium Users">Premium Users</option>
            </select>
            
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="at risk">At Risk</option>
              <option value="churned">Churned</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Customer
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Segment
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Churn Risk
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                LTV
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Join Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Last Activity
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-neutral-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="font-medium text-primary-800">
                        {customer.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-neutral-900">{customer.name}</div>
                      <div className="text-sm text-neutral-500">{customer.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  {customer.segment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`${getStatusBadgeClass(customer.status)}`}>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-24 bg-neutral-200 rounded-full h-2.5 mr-2">
                      <div 
                        className={`h-2.5 rounded-full ${
                          customer.churnRisk >= 70 ? 'bg-danger-500' : 
                          customer.churnRisk >= 40 ? 'bg-warning-500' : 
                          'bg-success-500'
                        }`}
                        style={{ width: `${customer.churnRisk}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm ${getRiskIndicatorClass(customer.churnRisk)}`}>
                      {customer.churnRisk}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  ${customer.lifetimeValue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  {new Date(customer.joinDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  {new Date(customer.lastActivity).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-neutral-500">
            Showing <span className="font-medium">{filteredCustomers.length}</span> of <span className="font-medium">{customerData.length}</span> customers
          </p>
        </div>
        
        <div className="space-x-2">
          <button className="btn-secondary">Previous</button>
          <button className="btn-primary">Next</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;