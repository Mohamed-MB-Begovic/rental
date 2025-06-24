import React, { useState } from 'react';

const Lease = () => {
  const [leaseData, setLeaseData] = useState({
    tenantName: '',
    propertyAddress: '',
    startDate: '',
    endDate: '',
    monthlyRent: '',
    securityDeposit: ''
  });
console.log('lease data')
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calculate lease duration in months
  const calculateLeaseDuration = () => {
    if (!leaseData.startDate || !leaseData.endDate) return 0;
    const start = new Date(leaseData.startDate);
    const end = new Date(leaseData.endDate);
    return Math.round((end - start) / (1000 * 60 * 60 * 24 * 30));
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    const startDate = new Date(leaseData.startDate);
    const endDate = new Date(leaseData.endDate);

    if (!leaseData.tenantName.trim()) newErrors.tenantName = 'Tenant name is required';
    if (!leaseData.propertyAddress.trim()) newErrors.propertyAddress = 'Property address is required';
    if (!leaseData.startDate) newErrors.startDate = 'Start date is required';
    if (!leaseData.endDate) newErrors.endDate = 'End date is required';
    if (endDate <= startDate) newErrors.dateRange = 'End date must be after start date';
    if (isNaN(leaseData.monthlyRent) || leaseData.monthlyRent <= 0) newErrors.monthlyRent = 'Valid monthly rent is required';
    if (isNaN(leaseData.securityDeposit) || leaseData.securityDeposit < 0) newErrors.securityDeposit = 'Valid security deposit is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Lease Agreement Form</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block text-sm font-medium mb-1">Tenant Full Name</label>
          <input
            type="text"
            name="tenantName"
            value={leaseData.tenantName}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.tenantName ? 'border-red-500' : ''}`}
          />
          {errors.tenantName && <p className="text-red-500 text-sm mt-1">{errors.tenantName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Property Address</label>
          <input
            type="text"
            name="propertyAddress"
            value={leaseData.propertyAddress}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.propertyAddress ? 'border-red-500' : ''}`}
          />
          {errors.propertyAddress && <p className="text-red-500 text-sm mt-1">{errors.propertyAddress}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Lease Start Date</label>
            <input
                type="date"
                        id="date"
                        name="startDate"
              value={leaseData.startDate}
              onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
              className={`w-full p-2 border rounded-md ${errors.startDate ? 'border-red-500' : ''}`}
            />
            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Lease End Date</label>
            <input
              type="date"
              name="endDate"
              value={leaseData.endDate}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.endDate ? 'border-red-500' : ''}`}
            />
            {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Monthly Rent ($)</label>
            <input
              type="number"
              name="monthlyRent"
              value={leaseData.monthlyRent}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.monthlyRent ? 'border-red-500' : ''}`}
            />
            {errors.monthlyRent && <p className="text-red-500 text-sm mt-1">{errors.monthlyRent}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Security Deposit ($)</label>
            <input
              type="number"
              name="securityDeposit"
              value={leaseData.securityDeposit}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.securityDeposit ? 'border-red-500' : ''}`}
            />
            {errors.securityDeposit && <p className="text-red-500 text-sm mt-1">{errors.securityDeposit}</p>}
          </div>
        </div>

        {errors.dateRange && <p className="text-red-500 text-sm">{errors.dateRange}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Generate Lease Agreement
        </button>
      </form>

      {isSubmitted && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-green-600">Lease Agreement Summary</h2>
          
          <div className="space-y-2">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Tenant Name:</span>
              <span>{leaseData.tenantName}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Property Address:</span>
              <span>{leaseData.propertyAddress}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Lease Term:</span>
              <span>
                {new Date(leaseData.startDate).toLocaleDateString()} - {' '}
                {new Date(leaseData.endDate).toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Lease Duration:</span>
              <span>{calculateLeaseDuration()} months</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Monthly Rent:</span>
              <span>${Number(leaseData.monthlyRent).toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Security Deposit:</span>
              <span>${Number(leaseData.securityDeposit).toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between pt-4">
              <span className="font-bold">Total Initial Payment:</span>
              <span className="font-bold">
                ${(Number(leaseData.monthlyRent) + Number(leaseData.securityDeposit)).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>By signing this agreement, both parties agree to the terms outlined above.</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="border-t pt-4">
                <p>Tenant Signature: ___________________</p>
                <p className="mt-2">Date: ___________________</p>
              </div>
              <div className="border-t pt-4">
                <p>Landlord Signature: ___________________</p>
                <p className="mt-2">Date: ___________________</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lease;  