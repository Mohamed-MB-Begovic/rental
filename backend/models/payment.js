// models/Payment.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  lease: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lease',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: { type: Number, required: true },
  method: {
    type: String,
    enum: ['creditCard', 'paypal', 'evc'],
    required: true
  },
  phoneNO:{
    type:Number,
    required:false,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  transactionId: String,
  paymentDetails: mongoose.Schema.Types.Mixed,

  processedAt: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;