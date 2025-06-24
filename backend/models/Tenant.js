// models/Tenant.js
import mongoose from 'mongoose' 

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  property: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  leaseStart: {
    type: Date,
    required: true
  },
  leaseEnd: {
    type: Date,
    required: true
  },
  rentAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Pending', 'Past'],
    default: 'Active'
  },
  emergencyContact: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Tenant = mongoose.model('Tenants', tenantSchema);

export default Tenant;