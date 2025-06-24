/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useEffect } from 'react';
import { FiDollarSign, FiCreditCard, FiCalendar, FiCheckCircle, FiClock, FiPlus, FiTrash2 } from 'react-icons/fi';
import axios from 'axios'
const Payments = () => {
  // Sample payment data
  const [payments, setPayments] = useState([]);
const [loading,setLoading]=useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'Credit Card', last4: '4242', expiry: '12/25', primary: true },
    { id: 2, type: 'Bank Account', last4: '5678', bankName: 'Chase', primary: false }
  ]);

  // State for modals and forms
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showAddMethod, setShowAddMethod] = useState(false);
  const [newPayment, setNewPayment] = useState({
    tenant: '',
    property: '',
    amount: '',
    dueDate: '',
    method: ''
  });
  const [newMethod, setNewMethod] = useState({
    type: 'Credit Card',
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
    bankName: '',
    routingNumber: '',
    accountNumber: ''
  });

  // Handle payment submission
  const handleAddPayment = (e) => {
    e.preventDefault();
    const payment = {
      id: payments.length + 1,
      tenant: newPayment.tenant,
      property: newPayment.property,
      amount: `$${newPayment.amount}`,
      date: '',
      dueDate: newPayment.dueDate,
      status: 'Pending',
      method: newPayment.method,
      receiptNo: ''
    };
    setPayments([...payments, payment]);
    setShowAddPayment(false);
    setNewPayment({
      tenant: '',
      property: '',
      amount: '',
      dueDate: '',
      method: ''
    });
  };

  // Handle payment method submission
  const handleAddMethod = (e) => {
    e.preventDefault();
    const method = {
      id: paymentMethods.length + 1,
      type: newMethod.type,
      last4: newMethod.type === 'Credit Card' ? newMethod.cardNumber.slice(-4) : newMethod.accountNumber.slice(-4),
      expiry: newMethod.expiry,
      primary: false,
      ...(newMethod.type === 'Bank Account' && { bankName: newMethod.bankName })
    };
    setPaymentMethods([...paymentMethods, method]);
    setShowAddMethod(false);
    setNewMethod({
      type: 'Credit Card',
      cardNumber: '',
      expiry: '',
      cvv: '',
      name: '',
      bankName: '',
      routingNumber: '',
      accountNumber: ''
    });
  };

  // Set payment method as primary
  const setAsPrimary = (id) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      primary: method.id === id
    })));
  };

  // Delete payment method
  const deleteMethod = (id) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  // Mark payment as paid
  const markAsPaid = (id) => {
    setPayments(payments.map(payment => 
      payment.id === id ? {
        ...payment,
        status: 'Paid',
        date: new Date().toISOString().split('T')[0],
        receiptNo: `RC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
      } : payment
    ));
  };


    // Fetch Payments from API
    useEffect(() => {
      const fetchPayments = async () => {
        try {
          setLoading(true);
          // const params = {
          //   status: statusFilter !== 'All' ? statusFilter : undefined,
          //   property: propertyFilter !== 'All' ? propertyFilter : undefined,
          //   search: searchTerm || undefined
          // };
          
          const { data } = await axios.get('/api/payments');
        
          setPayments(data)
         
        } catch (error) {
  
          console.log(error)
        }
         finally {
          setLoading(false);
        }
      };
  
      fetchPayments();
    }, []);


       // Add loading state
   if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Payment Management</h1>
      
      {/* Payment Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Collected</h3>
          <p className="text-2xl font-bold text-green-600">$7,000</p>
          <p className="text-gray-500 text-sm">This month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Pending Payments</h3>
          <p className="text-2xl font-bold text-yellow-600">$1,200</p>
          <p className="text-gray-500 text-sm">1 payment due</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Overdue</h3>
          <p className="text-2xl font-bold text-red-600">$0</p>
          <p className="text-gray-500 text-sm">No overdue payments</p>
        </div>
      </div>

      {/* Payment Actions */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Rent Payments</h2>
        <button
          onClick={() => setShowAddPayment(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <FiPlus className="mr-2" />
          Record Payment
        </button>
      </div>

      {/* Payments Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{payment.tenant}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payment.propertyTitle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${payment.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payment.dueDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                       <div className="flex space-x-2">

                     <button 
                          onClick={() => setSelectedPayment(payment)}
                          // onClick={() => <PaymentDetailsModal payment={payment} />}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </button>
                        {selectedPayment && <PaymentDetailsModal payment={payment} setSelectedPayment={setSelectedPayment}/>}
                    {payment.status === 'Pending' ? (
                      <button
                        onClick={() => markAsPaid(payment.id)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Mark as Paid
                      </button>

                    ) : (
                      <span className="text-green-600">Receipt: {payment.receiptNo}</span>
                    )}
                       </div>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Payment Methods</h2>
        <button
          onClick={() => setShowAddMethod(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <FiPlus className="mr-2" />
          Add Payment Method
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {paymentMethods.map((method) => (
          <div key={method.id} className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center mb-2">
                  <FiCreditCard className="h-5 w-5 text-gray-400 mr-2" />
                  <h3 className="text-lg font-medium text-gray-800">{method.type}</h3>
                  {method.primary && (
                    <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Primary</span>
                  )}
                </div>
                <p className="text-gray-600">
                  {method.type === 'Credit Card' ? `•••• •••• •••• ${method.last4}` : `${method.bankName} •••• ${method.last4}`}
                </p>
                {method.expiry && <p className="text-gray-600 mt-1">Expires {method.expiry}</p>}
              </div>
              <div className="flex space-x-2">
                {!method.primary && (
                  <button
                    onClick={() => setAsPrimary(method.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Set Primary
                  </button>
                )}
                <button
                  onClick={() => deleteMethod(method.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Payment Modal */}
      {showAddPayment && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Record New Payment
                    </h3>
                    <form onSubmit={handleAddPayment}>
                      <div className="grid grid-cols-1 gap-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Tenant</label>
                          <select
                            name="tenant"
                            value={newPayment.tenant}
                            onChange={(e) => setNewPayment({...newPayment, tenant: e.target.value})}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            required
                          >
                            <option value="">Select Tenant</option>
                            <option value="John Smith">John Smith</option>
                            <option value="Maria Garcia">Maria Garcia</option>
                            <option value="David Kim">David Kim</option>
                            <option value="Emily Chen">Emily Chen</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Property</label>
                          <select
                            name="property"
                            value={newPayment.property}
                            onChange={(e) => setNewPayment({...newPayment, property: e.target.value})}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            required
                          >
                            <option value="">Select Property</option>
                            <option value="Luxury Beach Villa">Luxury Beach Villa</option>
                            <option value="Downtown Loft">Downtown Loft</option>
                            <option value="Mountain Cabin Retreat">Mountain Cabin Retreat</option>
                            <option value="Urban Studio Apartment">Urban Studio Apartment</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Amount</label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="amount"
                              value={newPayment.amount}
                              onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
                              placeholder="0.00"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Due Date</label>
                          <input
                            type="date"
                            name="dueDate"
                            value={newPayment.dueDate}
                            onChange={(e) => setNewPayment({...newPayment, dueDate: e.target.value})}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                          <select
                            name="method"
                            value={newPayment.method}
                            onChange={(e) => setNewPayment({...newPayment, method: e.target.value})}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          >
                            <option value="">Select Method</option>
                            {paymentMethods.map(method => (
                              <option key={method.id} value={method.type}>
                                {method.type} {method.primary ? '(Primary)' : ''}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                        >
                          Record Payment
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddPayment(false)}
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    
      {/* Add Payment Method Modal */}
      {showAddMethod && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Add Payment Method
                    </h3>
                    <form onSubmit={handleAddMethod}>
                      <div className="grid grid-cols-1 gap-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Method Type</label>
                          <select
                            name="type"
                            value={newMethod.type}
                            onChange={(e) => setNewMethod({...newMethod, type: e.target.value})}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            required
                          >
                            <option value="Credit Card">Credit Card</option>
                            <option value="Bank Account">Bank Account</option>
                          </select>
                        </div>

                        {newMethod.type === 'Credit Card' ? (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Card Number</label>
                              <input
                                type="text"
                                name="cardNumber"
                                value={newMethod.cardNumber}
                                onChange={(e) => setNewMethod({...newMethod, cardNumber: e.target.value})}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="4242 4242 4242 4242"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                                <input
                                  type="text"
                                  name="expiry"
                                  value={newMethod.expiry}
                                  onChange={(e) => setNewMethod({...newMethod, expiry: e.target.value})}
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  placeholder="MM/YY"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">CVV</label>
                                <input
                                  type="text"
                                  name="cvv"
                                  value={newMethod.cvv}
                                  onChange={(e) => setNewMethod({...newMethod, cvv: e.target.value})}
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  placeholder="123"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Name on Card</label>
                              <input
                                type="text"
                                name="name"
                                value={newMethod.name}
                                onChange={(e) => setNewMethod({...newMethod, name: e.target.value})}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                              <input
                                type="text"
                                name="bankName"
                                value={newMethod.bankName}
                                onChange={(e) => setNewMethod({...newMethod, bankName: e.target.value})}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Routing Number</label>
                              <input
                                type="text"
                                name="routingNumber"
                                value={newMethod.routingNumber}
                                onChange={(e) => setNewMethod({...newMethod, routingNumber: e.target.value})}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Account Number</label>
                              <input
                                type="text"
                                name="accountNumber"
                                value={newMethod.accountNumber}
                                onChange={(e) => setNewMethod({...newMethod, accountNumber: e.target.value})}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                              />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                        >
                          Add Payment Method
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddMethod(false)}
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default Payments;





 
import { FiX, FiAlertCircle, FiUser, FiMail, FiPhone } from 'react-icons/fi';

const PaymentDetailsModal = ({ payment,setSelectedPayment }) => {
  if (!payment) return null;
  // console.log(payment)
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Get payment method details
  const getPaymentMethod = () => {
    switch (payment.method) {
      case 'creditCard':
        return { name: 'Credit Card', icon: <FiCreditCard className="text-blue-500" />, color: 'bg-blue-100 text-blue-800' };
      case 'paypal':
        return { name: 'PayPal', icon: <FiDollarSign className="text-blue-700" />, color: 'bg-blue-100 text-blue-800' };
      case 'evc':
        return { name: 'EVC Payment', icon: <FiPhone className="text-green-500" />, color: 'bg-green-100 text-green-800' };
      default:
        return { name: 'Other', icon: <FiDollarSign />, color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  // Get status details
  const getStatusDetails = () => {
    switch (payment.status) {
      case 'completed':
        return { text: 'Completed', icon: <FiCheckCircle className="text-green-500" />, color: 'bg-green-100 text-green-800' };
      case 'pending':
        return { text: 'Pending', icon: <FiClock className="text-amber-500" />, color: 'bg-amber-100 text-amber-800' };
      case 'failed':
        return { text: 'Failed', icon: <FiAlertCircle className="text-red-500" />, color: 'bg-red-100 text-red-800' };
      default:
        return { text: 'Unknown', icon: <FiClock />, color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  const method = getPaymentMethod();
  const status = getStatusDetails();
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* Blurred background with animated gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-blue-900/20 backdrop-blur-lg transition-opacity duration-300"
        onClick={()=>setSelectedPayment(null)}
      />
      
      {/* Glass morphism modal */}
      <div 
        className="relative bg-white/90 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl overflow-hidden w-full max-w-3xl mx-4 transform transition-all duration-300 scale-95  "
        style={{
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.85), rgba(245, 247, 255, 0.85))'
        }}
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 ">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white">Payment Details</h2>
              <p className="text-blue-100 mt-1">Transaction ID: {payment.transactionId || 'N/A'}</p>
            </div>
            <button
            // onClick={onclose}
              // onClick={setSelectedPayment(null)}
              onClick={()=>setSelectedPayment(null)}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex flex-wrap items-center justify-between mt-4">
            <div className="flex items-center">
              <div className="bg-white/20 p-3 rounded-lg mr-3">
                {method.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{formatCurrency(payment.amount)}</h3>
                <p className="text-blue-100">Payment Amount</p>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-0">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${method.color} flex items-center`}>
                {method.icon} <span className="ml-2">{method.name}</span>
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color} flex items-center mt-2`}>
                {status.icon} <span className="ml-2">{status.text}</span>
              </span>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Payment Information */}
            <div className="border-r-0 md:border-r md:pr-8 md:border-gray-200/50">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
                <FiCreditCard className="mr-2 text-indigo-600" />
                Payment Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium flex items-center">
                    {method.icon} <span className="ml-2">{method.name}</span>
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-medium text-blue-600">{formatCurrency(payment.amount)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-medium flex items-center ${status.color.replace('bg-', 'text-')}`}>
                    {status.icon} <span className="ml-2">{status.text}</span>
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Processed At</span>
                  <span className="font-medium">{payment.dueDate}</span>
                </div>
                
                {payment.phoneNO && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone Number</span>
                    <span className="font-medium">{payment.phoneNO}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* User and Lease Information */}
            <div className="md:pl-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
                <FiUser className="mr-2 text-indigo-600" />
                User & Lease Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">User</span>
                  <span className="font-medium flex items-center">
                   <span className="ml-2">{payment.tenant}</span>
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium text-blue-600">{payment.email}</span>
                </div>
                
                {/* <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium flex items-center">
                <span className="ml-2">{payment.phoneNO}</span>
                  </span>
                </div> */}
                
            
                 
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone Number</span>
                    <span className="font-medium">{payment.phoneNO}</span>
                  </div>
          

                
                    <div className="pt-4 mt-4 border-t border-gray-200/50">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Lease Information</h4>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property</span>
                        <span className="font-medium">
                          {payment.propertyTitle || 'No property'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between mt-2">
                        <span className="text-gray-600">Lease Period</span>
                        <span className="font-medium text-right">
                          {payment.startDate} - {payment.endDate}
                        </span>
                      </div>
                    </div>
                 
              </div>
            </div>
          </div>
          
          {/* Transaction ID */}
          <div className="mt-8 p-4 bg-gray-50/50 rounded-lg border border-gray-200/50">
            <div className="flex items-center">
              <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                <FiCreditCard className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Transaction ID</p>
                <p className="font-mono text-gray-800">{payment.transactionId || 'Not available'}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        {/* <div className="bg-gray-50/70 flex justify-end border-t border-gray-200/50">
          <button
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              onClick={()=>setSelectedPayment(null)
              }
          >
            Close Details
          </button>
        </div> */}
      </div>
    </div>
  );
};

// // Demo component to show the modal in action
// const PaymentDashboard = () => {
//   const [showModal, setShowModal] = useState(true);
  
//   // Sample payment data
//   const paymentData = {
//     _id: '683eb807c8f0fb7077a6fe51',
//     lease: {
//       _id: '683eb807c8f0fb7077a6fe50',
//       property: {
//         title: 'Luxury Waterfront Apartment'
//       },
//       startDate: '01-06-2025',
//       endDate: '31-05-2026'
//     },
//     user: {
//       name: 'Alex Johnson',
//       email: 'alex.johnson@example.com',
//       phoneNo: '+1 (555) 123-4567'
//     },
//     amount: 10100,
//     method: 'evc',
//     phoneNO: 613149900,
//     status: 'completed',
//     transactionId: 'PAY-7XL12345AB67890CD',
//     paymentDetails: { reference: 'EVCPAY-20250603' },
//     processedAt: '2025-06-03T08:53:27.145Z',
//     __v: 0
//   };
  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Management Dashboard</h1>
//         <p className="text-gray-600 max-w-lg mx-auto">
//           Click the button below to view a payment details modal with glass morphism effect
//         </p>
//       </div>
      
//       <button
//         onClick={() => setShowModal(true)}
//         className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
//       >
//         View Payment Details
//       </button>
      
//       {showModal && (
//         <PaymentDetailsModal 
//           payment={paymentData} 
//           onClose={() => setShowModal(false)} 
//         />
//       )}
      
//       <div className="mt-12 max-w-2xl text-center">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Glass Morphism Design</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[
//             { title: 'Modern Aesthetics', desc: 'Sleek design with subtle gradients and shadows' },
//             { title: 'Depth Effect', desc: 'Multi-layered elements with background blur' },
//             { title: 'Responsive Layout', desc: 'Adapts perfectly to all screen sizes' }
//           ].map((item, index) => (
//             <div 
//               key={index} 
//               className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-white/30 shadow-lg"
//             >
//               <h3 className="font-bold text-indigo-600 mb-2">{item.title}</h3>
//               <p className="text-gray-600">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
