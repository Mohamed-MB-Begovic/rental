import express from  'express';
import { createProperty, deleteProperty, getAllProperties, getPropertyById, getPropertyNames, getTenantProperties, updateProperty } from '../controllers/propertyController.js';
 import upload from '../config/multer.js';
import { Authenticate } from '../middleware/Authenticate.js';

const propertyRoutes = express.Router();

// Public routes
propertyRoutes.get('/propertyTitles',getPropertyNames)
propertyRoutes.get('/tenantProperties',Authenticate,getTenantProperties)
propertyRoutes.get('/', getAllProperties);
propertyRoutes.get('/:id', getPropertyById);
// Admin/protected routes
propertyRoutes.post('/',Authenticate,upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 },
    { name: 'videoTour', maxCount: 1 }
  ]),createProperty);
propertyRoutes.put('/:id', updateProperty);
propertyRoutes.delete('/:id', deleteProperty);

export default propertyRoutes;