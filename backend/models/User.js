import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  userType: { type: String, enum: ['owner', 'tenant'],default:"tenant" },
  phoneNo: { type: String },
  avatar: { type: String },
  throughEmail:{type:Boolean},
  company:{type:String},
  bio:{type:String},
  position:{type:String},
  createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', UserSchema);

export default User;