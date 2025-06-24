/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiDollarSign, FiCreditCard, FiCheckCircle, FiCalendar, FiLock, FiHome, FiUser, FiSmartphone, FiArrowLeft } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
const RentalPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
 
  const [evcDetails, setEvcDetails] = useState({
    phoneNumber: '',
    voucherNumber: ''
  });
let applicationFee=100
  // Lease Form State
  const [leaseFormData, setLeaseFormData] = useState({
    startDate: '',
    endDate: '',
    term: 12,
    monthlyRent: '',
    applicationFee,
    method:'',
    phoneNO:'',
  });

    const paymentData={
    
  }

function calculateEndDate(startDate, termMonths) {
  const date = new Date(startDate);
  console.log("Start Date (UTC):", date.toISOString());

  const originalDay = date.getUTCDate();
  date.setUTCMonth(date.getUTCMonth() + termMonths);
  console.log("After Adding Months:", date.toISOString());

  if (date.getUTCDate() !== originalDay) {
    date.setUTCDate(0);
    console.log("After Adjustment:", date.toISOString());
  }
  setLeaseFormData({...leaseFormData,endDate:date.toISOString().split('T')[0]})
  return date.toISOString().split('T')[0];
}
  // Payment State
  // const [paymentMethod, setPaymentMethod] = useState('creditCard');
  // const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [agreement, setAgreement] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

    // Payment method options
  const paymentMethods = [
    { id: 'creditCard', name: 'Credit/Debit Card', icon: <FiCreditCard /> },
 
    { id: 'paypal', name: 'PayPal', icon: <FiUser /> },
    { id: 'evc', name: 'EVC Payment', icon: <FiSmartphone /> }
  ];
 



  // Calculate payment breakdown
  // const paymentBreakdown = {
  //   firstMonthRent: Number(leaseFormData.monthlyRent) || 0,
  //   securityDeposit: Number(leaseFormData.securityDeposit) || 0,
  //   applicationFee: Number(leaseFormData.applicationFee) || 0,
  //   get total() {
  //     return this.firstMonthRent + this.securityDeposit + this.applicationFee;
  //   }
  // };

  // Handle form navigation
  const handleNextStep = () => {
    if (step === 1) {
      // Validate lease form
      if (!leaseFormData.startDate || !leaseFormData.monthlyRent) {
        alert('Please fill in all required lease details');
        return;
      }
    }
    calculateEndDate(leaseFormData.startDate,Number(leaseFormData.term))
    setStep(prev => prev + 1);
    // console.log(leaseFormData)
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  // Handle payment submission
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setPaymentStatus('processing');
    // console.log(paymentData)

    try {
      // console.log(leaseFormData)
        const {data}= await axios.post('/api/lease', leaseFormData);
        // const response= await axios.post('/api/payments', paymentData);
      setPaymentStatus('success');
      toast.success('lease agreement success')
      setLeaseFormData({
    startDate: '',
    endDate: '',
    term: 12,
    monthlyRent: '',
    applicationFee,
    method:'',
    phoneNO:'',
  });
  navigate('/')
    } catch (error) {
      console.log(error)
    }
    // Simulate payment processing
    // setTimeout(() => {
    //   setPaymentStatus('success');
    //   // Here you would typically send the leaseFormData and payment details to your API
    // }, 2000);
  };

  // Fetch property details
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/properties/${id}`);
        setProperty(data.data);
        setLeaseFormData(prev=>({
          ...prev,
          property:data.data._id,
          amount:data.data.price +applicationFee,
                monthlyRent: data.data.price,
        }))
        // Initialize lease form with property price
     
      } catch (err) {
        console.error(err);
        navigate('/error');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id, navigate]);
 
// console.log(property?._id)
// Example usage with your input
// const input = "Wed Apr 19 20254 17:00:00 GMT-0700 (Pacific Daylight Time)";
// console.log(convertDate(input)); // Output: "2025-04-20" (timezone conversion)



//  console.log(paymentMethod)
  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="flex flex-col items-center space-y-2">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );

  if (!property) return <div className="text-center py-8">Property not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2">Lease Details</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-2"></div>
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2">Payment</span>
            </div>
          </div>
        </div>

  <div className="bg-white w-full max-w-4xl mx-auto shadow rounded-lg overflow-hidden">
  {/* Property Summary */}
  <div className="p-4 sm:p-6 border-b border-gray-200">
    <div className="flex items-center">
      <img 
        src={property.thumbnail} 
        alt={property.title} 
        className="h-12 w-12 sm:h-16 sm:w-16 rounded-md object-cover mr-3 sm:mr-4"
      />
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{property.title}</h2>
        <p className="text-sm sm:text-base text-gray-600">{property.location}</p>
      </div>
    </div>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-0">
    {/* Left Column - Form */}
    <div className="p-4 sm:p-6 border-r border-gray-200">
      {step === 1 ? (
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Lease Agreement Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Lease Start Date */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lease Start Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  name="startDate"
                  value={leaseFormData.startDate}
                  onChange={(e) => 
                    {
                      setLeaseFormData({...leaseFormData, startDate: e.target.value})}

                    }
                    min={new Date().toISOString().split('T')[0]}
                  className="pl-10 w-full p-2 text-sm border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Lease Term */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lease Term (months) <span className="text-red-500">*</span>
              </label>
              <select
                name="term"
                value={leaseFormData.term}
                onChange={(e) => setLeaseFormData({...leaseFormData, term: e.target.value})}
                className="w-full p-2 text-sm border border-gray-300 rounded-lg"
              >
                <option value="1">1 Month</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
                <option value="24">24 Months</option>
              </select>
            </div>

            {/* Monthly Rent */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Rent ($) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="monthlyRent"
                  value={leaseFormData.monthlyRent}
                  disabled
                  className="pl-10 w-full p-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
            </div>

            {/* Application Fee */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Application Fee ($)</label>
              <div className="relative">
                <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="applicationFee"
                  value={leaseFormData.applicationFee}
                  disabled
                  className="pl-10 w-full p-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 sm:mt-8">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 sm:px-6 py-2 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      ) : (
        /* Payment Step */
        <div className="p-4 sm:p-6">
          {/* Payment status sections */}
          {paymentStatus === 'success' ? (
            <div className="text-center py-6 sm:py-8">
              <FiCheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Your payment of ${(leaseFormData.monthlyRent * leaseFormData.term + leaseFormData.applicationFee).toLocaleString()} has been processed.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-md p-4 text-left max-w-md mx-auto text-sm">
                <h4 className="font-medium text-green-800 mb-2">Next Steps:</h4>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  <li>Lease agreement has been emailed to you</li>
                  <li>Move-in instructions will be sent 3 days before your lease start date</li>
                  <li>Contact property manager for any questions</li>
                </ul>
              </div>
            </div>
          ) : paymentStatus === 'processing' ? (
            <div className="text-center py-8 sm:py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Processing Your Payment</h3>
              <p className="text-gray-600 text-sm sm:text-base">Please wait while we secure your payment...</p>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4 sm:mb-6">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => {
                      setPaymentMethod(method.id)
                        setLeaseFormData(prev=>({
          ...prev,
          method:method.id
        }))
                    }}
                    className={`p-2 sm:p-3 border rounded-md flex flex-col items-center ${
                      paymentMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                  >
                    <span className="text-gray-700 mb-1">{method.icon}</span>
                    <span className="text-xs sm:text-sm text-gray-700">{method.name}</span>
                  </button>
                ))}
              </div>

              {/* Payment form sections */}
              {/* ... (maintain existing payment form structure with responsive classes) */}
                 {paymentMethod === 'creditCard' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiCreditCard className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2"
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiCalendar className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2"
                              value={cardDetails.expiry}
                              onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiLock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              placeholder="123"
                              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2"
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                        <input
                          type="text"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                        />
                      </div>
                    </div>
                  )}

           

                  {paymentMethod === 'paypal' && (
                    <div className="text-center py-8">
                      <button className="px-6 py-3 bg-yellow-400 rounded-md text-white font-medium">
                        Continue with PayPal
                      </button>
                    </div>
                  )}

                  {paymentMethod === 'evc' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSmartphone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            placeholder="+252 61 1234567"
                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2"
                            value={leaseFormData.phoneNO}
                            onChange={(e) =>   setLeaseFormData(prev=>({
          ...prev,
          phoneNO:e.target.value
        }))}
                          />
                        </div>
                      </div>

                     

                      <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800">
                        <p>EVC payments are processed instantly. A small service fee may apply.</p>
                      </div>
                    </div>
                  )}

              <div className="mt-6">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    checked={agreement}
                    onChange={(e) => setAgreement(e.target.checked)}
                  />
                  <span className="ml-2 text-xs sm:text-sm text-gray-700">
                    I authorize {property.managementCompany} to charge my payment method...
                  </span>
                </label>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handlePaymentSubmit}
                  // disabled={/* existing condition */} 
                  className={`px-4 sm:px-6 py-2 text-sm sm:text-base ${
                    !agreement ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                  } text-white rounded-md transition-colors`}
                >
                  {paymentMethod === 'evc' ? 'Confirm EVC Payment' : 'Submit Payment'}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>

    {/* Right Column - Summary */}
    <div className="p-4 sm:p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {step === 1 ? 'Lease Summary' : 'Payment Summary'}
      </h3>
      
      {step === 1 ? (
        <div className="space-y-3 sm:space-y-4">
          <div className="flex justify-between text-sm sm:text-base">
            <span className="text-gray-600">Property:</span>
            <span className="font-medium">{property.title}</span>
          </div>
          <div className="flex justify-between text-sm sm:text-base">
            <span className="text-gray-600">Monthly Rent:</span>
            <span className="font-medium">${leaseFormData.monthlyRent}</span>
          </div>
          <div className="flex justify-between text-sm sm:text-base">
            <span className="text-gray-600">Lease Term:</span>
            <span className="font-medium">{leaseFormData.term} months</span>
          </div>
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between font-medium text-sm sm:text-base">
              <span>Total Initial Payment:</span>
              <span>${(leaseFormData.monthlyRent * leaseFormData.term + leaseFormData.applicationFee).toLocaleString()}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between text-sm sm:text-base">
            <span className="text-gray-600">Monthly Rent:</span>
            <span className="font-medium">${property.price}</span>
          </div>
          {leaseFormData.applicationFee > 0 && (
            <>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">Application Fee:</span>
                <span className="font-medium">${property.applicationFee?.toLocaleString() || 100}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">Term:</span>
                <span className="font-medium">{leaseFormData.term} {leaseFormData.term > 1 ? "months" : "month"}</span>
              </div>
            </>
          )}
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between font-bold text-base sm:text-lg">
              <span>Total Due:</span>
              <span>${(leaseFormData.monthlyRent * leaseFormData.term + leaseFormData.applicationFee).toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 sm:p-4 mt-4">
            <h4 className="font-medium text-blue-800 mb-2 text-sm sm:text-base">Lease Details</h4>
            <ul className="text-blue-700 space-y-1 text-xs sm:text-sm">
              <li className="flex justify-between">
                <span>Lease Start:</span>
                <span>{new Date(leaseFormData.startDate).toLocaleDateString()}</span>
              </li>
              <li className="flex justify-between">
                <span>Lease Term:</span>
                <span>{leaseFormData.term} months</span>
              </li>
              <li className="flex justify-between">
                <span>Monthly Rent:</span>
                <span>${leaseFormData.monthlyRent.toLocaleString()}</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 text-xs sm:text-sm text-gray-500">
            <p className="mb-2">All payments are secured with 256-bit SSL encryption.</p>
            <div className="flex items-center gap-2">
              <FiLock className="h-4 w-4 text-gray-400 shrink-0" />
              <span>Secure Payment Processing</span>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default RentalPayment;