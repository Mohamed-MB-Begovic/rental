// controllers/tenantController.js

// const Tenant = require('../models/Tenant');
import Tenant from '../models/Tenant.js'
import Lease from '../models/Lease.js'
// @desc    Get all tenants
// @route   GET /api/tenants
// @access  Public
export const getTenants = async (req, res) => {
  try {
    const { status, property } = req.query;
    const query = {};
    
    // Add filters if provided
    if (status && status !== 'All') query.status = status;
    if (property && property !== 'All') query.property = property;

const leases = await Lease.find(query)
  .populate({
    path: "property",
    select: "ownerId title type location price commonAttributes specificAttributes image",
    populate: {           
      path: "ownerId",  // Changed from "user" to match your schema field
      select: "name"    
    }
  })
  .populate({
    path: 'user',
    select: "name email phoneNo"
  })
  .lean()
  .exec();

    const now = new Date();
    
    // Robust date formatting function (handles both strings and Date objects)
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

    // Transform to get desired tenant data
    const tenants = leases.map(lease => {
      // Create date objects once for reuse
      const endDateObj = new Date(lease.endDate);
      
      return {
        name: lease.user?.name || 'N/A',
        email: lease.user?.email || 'N/A',
        phoneNo: lease.user?.phoneNo || 'N/A',
        property: lease.property?.title || 'No Property',
        type: lease.property?.type || 'No type',
        startDate: formatDate(lease.startDate),
        endDate: formatDate(endDateObj),
        rentAmount: lease.monthlyRent,
        term:lease.term || 'N/A',
        totalRent:lease.totalRent,
        status: endDateObj < now ? 'expired' : 'active',
        location:lease.property?.location,
        Price:lease.property?.Price,
        amenities:[...lease.property?.specificAttributes,...lease.property?.commonAttributes],
        image:lease.property?.thumbnail,
        landlord:lease?.property?.ownerId
      };
    });

    res.status(200).json(tenants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get single tenant
// @route   GET /api/tenants/:id
// @access  Public
export const getTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    
    if (!tenant) {
      return res.status(404).json({ msg: 'Tenant not found' });
    }
    
    res.json(tenant);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Tenant not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Create tenant
// @route   POST /api/tenants
// @access  Public
export const createTenant = async (req, res) => {
  try {
    const newTenant = new Tenant({
      ...req.body,
      leaseStart: new Date(req.body.leaseStart),
      leaseEnd: new Date(req.body.leaseEnd)
    });

    const tenant = await newTenant.save();
    res.json(tenant);
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'Tenant with this email already exists' });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Update tenant
// @route   PUT /api/tenants/:id
// @access  Public
export const updateTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!tenant) {
      return res.status(404).json({ msg: 'Tenant not found' });
    }

    res.json(tenant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete tenant
// @route   DELETE /api/tenants/:id
// @access  Public
export const deleteTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndDelete(req.params.id);

    if (!tenant) {
      return res.status(404).json({ msg: 'Tenant not found' });
    }

    res.json({ msg: 'Tenant removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};