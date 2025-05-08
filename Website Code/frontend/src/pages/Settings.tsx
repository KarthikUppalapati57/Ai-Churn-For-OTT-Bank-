import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="card animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      
      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-medium mb-4 text-neutral-900">Application Settings</h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="company-name" className="block text-sm font-medium text-neutral-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company-name"
                  className="input"
                  defaultValue="Acme Inc."
                />
              </div>
              
              <div>
                <label htmlFor="api-url" className="block text-sm font-medium text-neutral-700 mb-1">
                  API URL
                </label>
                <input
                  type="text"
                  id="api-url"
                  className="input"
                  defaultValue="https://api.example.com/v1"
                />
              </div>
              
              <div>
                <label htmlFor="refresh-interval" className="block text-sm font-medium text-neutral-700 mb-1">
                  Data Refresh Interval (minutes)
                </label>
                <input
                  type="number"
                  id="refresh-interval"
                  className="input"
                  defaultValue="15"
                  min="1"
                />
              </div>
            </div>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-neutral-700">Enable real-time notifications</span>
              </label>
            </div>
          </div>
        </section>
        
        <section>
          <h3 className="text-lg font-medium mb-4 text-neutral-900">Model Configuration</h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="ott-threshold" className="block text-sm font-medium text-neutral-700 mb-1">
                  OTT Model Threshold (%)
                </label>
                <input
                  type="number"
                  id="ott-threshold"
                  className="input"
                  defaultValue="50"
                  min="1"
                  max="99"
                />
                <p className="mt-1 text-xs text-neutral-500">Probability threshold for churn classification</p>
              </div>
              
              <div>
                <label htmlFor="bank-threshold" className="block text-sm font-medium text-neutral-700 mb-1">
                  Banking Model Threshold (%)
                </label>
                <input
                  type="number"
                  id="bank-threshold"
                  className="input"
                  defaultValue="50"
                  min="1"
                  max="99"
                />
                <p className="mt-1 text-xs text-neutral-500">Probability threshold for churn classification</p>
              </div>
            </div>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-neutral-700">Enable model retraining notifications</span>
              </label>
            </div>
          </div>
        </section>
        
        <section>
          <h3 className="text-lg font-medium mb-4 text-neutral-900">User Interface</h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-neutral-700 mb-1">
                  Theme
                </label>
                <select id="theme" className="select">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>System</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="date-format" className="block text-sm font-medium text-neutral-700 mb-1">
                  Date Format
                </label>
                <select id="date-format" className="select">
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-neutral-700">Enable animations</span>
              </label>
            </div>
          </div>
        </section>
      </div>
      
      <div className="mt-8 flex justify-end space-x-4">
        <button className="btn-secondary">Reset to Defaults</button>
        <button className="btn-primary">Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;