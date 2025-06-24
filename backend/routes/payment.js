// const express from 'express'
import express from 'express'
import { getPayments, processPayment } from '../controllers/paymentController.js';
import { Authenticate } from '../middleware/Authenticate.js';
// import Payment from '../models/payment.js';
// import { authenticate } from 'passport';
 

const PaymentRouter=express.Router();

PaymentRouter.post('/',Authenticate,processPayment)
PaymentRouter.get('/',Authenticate,getPayments)


export default PaymentRouter;