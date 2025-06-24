// routes/auth.js
import express from 'express'
const router = express.Router();
import {register,login,forgotPassword,resetPassword,getMe, successRoute, failureRoute, updateUser, logout}  from '../controllers/auth.js'
import {protect} from '../middleware/Auth.js'
import {validateRegister,validateLogin} from '../validators/auth.js'
import passport from 'passport';

 
// Public routes
router.post('/register', validateRegister, register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken',resetPassword);

// Protected routes (require authentication)
router.get('/:id', protect, getMe);
router.put('/update-profile/:id', protect, updateUser);
// router.put('/update-details', protect, authController.updateDetails);
// router.put('/update-password', protect, authController.updatePassword);
router.get('/logout', logout);

// module.exports = router;

export default router;