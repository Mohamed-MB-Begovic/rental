// const ScheduleTour = require('../models/ScheduleTour');
// const Property = require('../models/Property');
import Property from '../models/property.js'
import ScheduleTour from '../models/scheduleTour.js'

// Create a new tour schedule
export const createScheduleTour = async (req, res) => {
    // console.log(req.body)
  try {
    const { name, email, phone, date, time, message, propertyId } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !propertyId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Create new tour schedule
    const newTour = new ScheduleTour({
      property: propertyId,
      name,
      email,
      phone,
      date: new Date(date),
      time,
      message
    });

    await newTour.save();

    res.status(201).json({
      success: true,
      message: 'Tour scheduled successfully',
      data: newTour
    });
  } catch (error) {
    console.error('Error scheduling tour:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};