// const express from 'express'
import express from 'express'
 
import { Authenticate } from '../middleware/Authenticate.js';
import { createLeaseAgreement } from '../controllers/leaseController.js';

const leaseRouter=express.Router();

leaseRouter.post('/',Authenticate,createLeaseAgreement)



export default leaseRouter;