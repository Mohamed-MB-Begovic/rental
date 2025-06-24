import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import {JWT_SECRET} from '../config/config.js'
import crypto from "crypto"
// const { ObjectId } = require('mongoose').Types;
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

// Register new agent/admin
export const register = async (req, res) => {
  const { name, email, password, userType ,phoneNo} = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send('User already exists');
    }

    user = new User({ name, email, password, userType ,phoneNo});
    await user.save();
    res.status(200).send("inserted successfully");



  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Authenticate user
export const login = async (req, res) => {
  const { email, password } = req.body;
 console.log(email)
 console.log(password)
  try {
    let user = await User.findOne({ email:email }).select('+password')
    if (!user || !user.password) {
      return res.status(400).send('something is wrong');
    }
// console.log(user.password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid password');
    }
 
   const expiresIn=7*24*60*60
            const token=jwt.sign({_id:user._id},JWT_SECRET,{
                expiresIn
            })

            res.cookie('token',token,{
                httpOnly:true,
                maxAge:expiresIn *1000,
                secure:false
            })
  res.status(200).send({...user.toJSON(),expiresIn})
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get logged-in user
export const getMe = async (req, res) => {
  // console.log('in me')
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.json(user);
    // console.log(user)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// controllers/authController.js

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // 1) Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse('No user found with that email', 404));
    }

    // 2) Generate reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) Create reset URL
    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/auth/reset-password/${resetToken}`;

    // 4) Create email message
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      // 5) Send email
      await sendEmail({
        email: user.email,
        subject: 'Password reset token (valid for 10 min)',
        message
      });

      res.status(200).json({
        success: true,
        data: 'Token sent to email'
      });
    } catch (err) {
      // Reset the token if email fails
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(
        new ErrorResponse('Email could not be sent', 500)
      );
    }
  } catch (err) {
    next(err);
  }
};

// controllers/authController.js
export const resetPassword = async (req, res, next) => {
  try {
    // 1) Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    // 2) Find user by token and check expiration
    const user = await User.findOne({
      passwordResetToken: resetPasswordToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return next(new ErrorResponse('Invalid or expired token', 400));
    }

    // 3) Set new password and clear reset fields
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 4) Log the user in (send JWT)
    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};





export const successRoute =(req, res) => {
  // const {displayName}=req.user
  // res.send("Hello "+displayName);
  console.log('login successfully')

  res.status(200).send(req.user)
};

export const failureRoute=(req,res)=>{
  console.log('something went wrong')
}


// Update User Controller
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    // console.log(id)
    // console.log(updates)
    // 1. Validate ObjectID format
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }

    // 2. Define allowed fields and security restrictions
    const allowedUpdates = ['name', 'email', 'avatar','phoneNo','id', '_id', 'throughEmail','phone','userType','company','bio','position','createdAt', '__v'];
    const attemptedUpdates = Object.keys(updates);
    
    // 3. Check for disallowed fields
    const invalidUpdates = attemptedUpdates.filter(
        field => !allowedUpdates.includes(field)
    );
    
    if (invalidUpdates.length > 0) {
        return res.status(400).json({
            message: `Invalid update fields: ${invalidUpdates.join(', ')}`,
            allowedFields: allowedUpdates
        });
    }

    try {
        // 4. Handle email uniqueness check
        if (updates.email) {
            const existingUser = await User.findOne({ 
                email: updates.email,
                _id: { $ne: id } // Exclude current user
            });
            
            if (existingUser) {
                return res.status(409).json({
                    message: 'Email already exists',
                    field: 'email'
                });
            }
        }

        // 5. Find and update user
        const user = await User.findByIdAndUpdate(
            id,
            { $set: updates },
            {
                new: true,          // Return updated document
                runValidators: true // Run model validators
            }
        ).select('-__v -createdAt -throughEmail'); // Exclude fields

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 6. Return updated user data
        res.json({
            message: 'User updated successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                avatar: user.avatar,
                phoneNo:user.phoneNo || ''
            }
        });
        
    } catch (error) {
        console.error('Update error:', error);
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ 
                message: 'Validation failed',
                errors 
            });
        }
        
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Logout Route
export const logout = async(req, res) => {
   req.logout((err) => {
     if (err) return res.status(500).json({ success: false });
     req.session.destroy();
     res.clearCookie('connect.sid');
     res.status(200).json({ success: true });
   });
};