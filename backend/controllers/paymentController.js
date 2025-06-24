// controllers/paymentController.js
import Payment from "../models/payment.js";

export const processPayment = async (req, res) => {
  // console.log('request comming from payment process')
  try {
    console.log(req.body)
    // const { leaseId, paymentMethod, paymentDetails } = req.body;
    
    // const paymentData = {
    //   lease: leaseId,
    //   user: req.user.id,
    //   method: paymentMethod,
    //   paymentDetails,
    //   amount: req.body.amount,
    //   status: 'completed'
    // };

    // const payment = await Payment.create(paymentData);
    
    // // Update lease status to active
    // await LeaseAgreement.findByIdAndUpdate(leaseId, { status: 'active' });

    // res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getPayments = async (req, res) => {
  try {
    const { status, property } = req.query;
    const query = {};
    
    // // Add filters if provided
    // if (status && status !== 'All') query.status = status;
    // if (property && property !== 'All') query.property = property;

  const payment = await Payment.find()
.populate({
    path: "lease",
    select: "property startDate endDate ",  // Select lease's property field
    populate: {          // Nested population
      path: "property",
      select: "title"    // Select property's title
    }
  })
      .populate({
        path: 'user',
        select: "name email phoneNO "
      })
      .lean()
      .exec();
function formatDate(dateInput) {
      const date = new Date(dateInput);
      // Return 'Invalid Date' for invalid inputs
      if (isNaN(date.getTime())) return 'Invalid Date';
      
      // Get UTC date components (to match database storage)
      const day = String(date.getUTCDate()).padStart(2, '0');
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const year = date.getUTCFullYear();
      
      return `${day}-${month}-${year}`;
    }
   const payments = payment.map(payment => {
    return {
       propertyTitle : payment.lease?.property?.title,
       tenant:payment.user?.name,
       method:payment.method,
       phoneNO:payment.phoneNO,
       status:payment.status,
       dueDate:formatDate(payment.processedAt),
       amount:payment.amount,
       email:payment.user.email,
       startDate:formatDate(payment.lease?.startDate),
       endDate:formatDate(payment.lease?.endDate),
    }
  // Instead of payment.leaseAgreement
});
// console.log(payments)
    // const now = new Date();
    
    // Robust date formatting function (handles both strings and Date objects)
    

    // Transform to get desired tenant data
//     const payments = payment.map(payment => {
//       // Create date objects once for reuse
//       const endDateObj = new Date(payment.endDate);
      
//       return {
//         name: payment.user?.name || 'N/A',
//         email: payment.user?.email || 'N/A',
//         phoneNo: payment.user?.phoneNo || 'N/A',
//         property: payment.property?.title || 'No Property',
//         type: payment.property?.type || 'No type',
//         startDate: formatDate(payment.startDate),
//         endDate: formatDate(endDateObj),
//         rentAmount: payment.monthlyRent,
//         term:payment.term || 'N/A',
//         totalRent:payment.totalRent,
//         status: endDateObj < now ? 'expired' : 'active'
//       };
//     });
// console.log(payments)
    res.status(200).json(payments);
//  console.log(payment)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};