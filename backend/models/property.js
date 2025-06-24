import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true }, // e.g. "apartment", "cabin"
  price: { type: Number, required: true },
  tourPrice:{type:Number},
  location: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  status:{
    type: String,
    enum: ['available', 'rented'],
    default: 'available',
  },
  furnished: {
    type: String,
    enum: ['fully', 'partially', 'unfurnished'],
    default: 'unfurnished',
  },
  thumbnail:{type:String},
  videoTour: { type: String },
  description: { type: String, required: true },
  images: [{ type: String }], // URLs to uploaded images
  commonAttributes:[String],
  specificAttributes:[String],
  ownerId:{
    type:mongoose.Types.ObjectId,
    ref:"User"
    }
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);


export default Property;