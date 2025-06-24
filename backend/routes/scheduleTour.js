import express from 'express'
const ScheduleTourRouter = express.Router();
// const { createScheduleTour } = require('../controllers/scheduleTourController');
// const { getPropertyById } = require('../controllers/propertyController');
import { createScheduleTour } from '../controllers/scheduleTourController.js';

ScheduleTourRouter.post('/', createScheduleTour);
// ScheduleTourRouter.get('/properties/:id', getPropertyById);



export default ScheduleTourRouter;