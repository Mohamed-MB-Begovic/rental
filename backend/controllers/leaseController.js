// controllers/leaseController.js
// const LeaseAgreement = require('../models/LeaseAgreement');
// const Property = require('../models/Property');
import Lease from "../models/Lease.js";
import Payment from "../models/payment.js";
import Property from "../models/property.js";
export const createLeaseAgreement = async (req, res) => {

  // console.log(req.user)
  // console.log('request from lease agreement')
  // console.log(req.body)
  try {
    
    const property = await Property.findById(req.body.property);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
 
    const leaseData = {
      ...req.body,
      property: property._id,
      user: req.user._id,
      monthlyRent: property.price,
      totalRent:Number(req.body.term*req.body.monthlyRent)
    };
const newLease= new Lease(leaseData)
// await newLease.save()
// payment 
const { method, paymentDetails ,amount,phoneNO} = req.body;
    
    const paymentData = {
      lease: newLease._id,
      user: req.user._id,
      method,
      amount,
      phoneNO,
      status: 'completed'
    };
    const newPayment=new Payment(paymentData);
    // console.log(newLease)
    // console.log(newPayment)
    await newLease.save();
    await newPayment.save();
    // Update lease status to active
    res.status(200).send("lease agreement success")
    await Lease.findByIdAndUpdate(newLease._id, { status: 'active' });
    await Property.findByIdAndUpdate(property._id, { status: 'rented' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};