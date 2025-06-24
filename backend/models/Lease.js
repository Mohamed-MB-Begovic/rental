// models/LeaseAgreement.js
import mongoose from "mongoose";

const leaseSchema = new mongoose.Schema({
  property: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  term: { type: Number, enum: [1, 3, 6, 12, 24], required: true },
  monthlyRent: { type: Number, required: true },
  totalRent:{type:Number },
  applicationFee: { type: Number, default: 100 },
  status: { 
    type: String, 
    enum: ['pending', 'active', 'terminated'],
    default: 'pending'
  }
});

// Pre-save hook to calculate endDate
leaseSchema.pre('save', function(next) {
  const start = new Date(this.startDate);
  this.endDate = new Date(start.setMonth(start.getMonth() + this.term));
  next();
});

const Lease = mongoose.model('Lease', leaseSchema);

export default Lease;