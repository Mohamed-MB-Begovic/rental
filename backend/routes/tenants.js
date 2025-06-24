// routes/tenants.js
// const express = require('express');
import express from 'express'
import { check } from 'express-validator';
import { createTenant, deleteTenant, getTenant, getTenants, updateTenant } from '../controllers/tenantController.js';
const tenantRouter = express.Router();
// const { check } = require('express-validator');


// Get all tenants with filters
tenantRouter.get('/', getTenants);

// Get single tenant
tenantRouter.get('/:id', getTenant);

// Create new tenant
tenantRouter.post(
  '/',
//   [
//     check('name', 'Name is required').not().isEmpty(),
//     check('email', 'Please include a valid email').isEmail(),
//     check('phone', 'Phone number is required').not().isEmpty(),
//     check('property', 'Property is required').not().isEmpty(),
//     check('unit', 'Unit number is required').not().isEmpty(),
//     check('leaseStart', 'Lease start date is required').not().isEmpty(),
//     check('leaseEnd', 'Lease end date is required').not().isEmpty(),
//     check('rentAmount', 'Rent amount is required').isNumeric(),
//     check('emergencyContact', 'Emergency contact is required').not().isEmpty()
//   ],
  createTenant
);

// Update tenant
tenantRouter.put('/:id', updateTenant);

// Delete tenant
tenantRouter.delete('/:id', deleteTenant);

export default  tenantRouter;