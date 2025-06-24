import Lease from '../models/Lease.js';
import  Property from '../models/property.js';
import  cloudinary from 'cloudinary'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

const uploadToCloudinary = (file, resourceType = 'image') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { resource_type: resourceType },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(file.buffer);
  });
};

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = async (req, res) => {
  try {
    // Get the target property
    const property = await Property.findById(req.params.id);
    
    if (!property) {
        return res.status(404).json({ message: 'Property not found' });
    }

  // Build similarity criteria
  const similarityCriteria = {
    _id: { $ne: property._id },
    status: 'available',
    $or: [
      { type: property.type },
      { 
        price: { 
          $gte: property.price * 0.8, 
          $lte: property.price * 1.2 
        }
      },
      {
        location: {
          $regex: property.location.split(',')[0],
          $options: 'i'
        }
      }
    ]
  };
    // Get similar properties (limit to 5 by default)
    let similarProperties = await Property.find(similarityCriteria)
        .limit(req.query.limit || 5)
        .select('-__v'); // Exclude version field

        if (similarProperties.length === 0) {
          similarProperties = await Property.find({
            _id: { $ne: property._id },
            status: 'available'
          })
            .limit(4)
            .select('-__v -createdAt -updatedAt')
            .lean();
        }
      
    res.json({
        success: true,
        data: property,
        similarProperties,
        // matchesFound: similarProperties.length
    });

} catch (error) {
    res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
    });
    console.log(error)
}
  }
// @desc    Create property
// @route   POST /api/properties
// @access  Private/Admin
export const createProperty = async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['title', 'type', 'price', 'location', 'bedrooms', 'bathrooms', 'description'];
    for (const field of requiredFields) {
      if (!req.body[field]?.trim()) {
        return res.status(400).json({ success: false, error: `${field} is required` });
      }
    }

    // Validate numeric fields
    const numericFields = ['price', 'bedrooms', 'bathrooms'];
    for (const field of numericFields) {
      if (isNaN(req.body[field])) {
        return res.status(400).json({ success: false, error: `${field} must be a valid number` });
      }
    }
    let thumbnailUrl ;
    // File handling validation
    if (req.files?.thumbnail) {
        // Upload thumbnail
    const thumbnailFile = req.files.thumbnail[0];
    const thumbnailResult = await uploadToCloudinary(thumbnailFile);
    thumbnailUrl= thumbnailResult.secure_url;
    }

    // Handle image uploads
    let imageUrls = [];
    if (req.files?.images) {
      const uploadPromises = req.files.images.map(file => uploadToCloudinary(file));
      const results = await Promise.all(uploadPromises);
      imageUrls = results.map(result => result.secure_url);
    }

    // Handle video upload
    let videoUrl = null;
    if (req.files?.videoTour) {
      const videoFile = req.files.videoTour[0];
      const result = await uploadToCloudinary(videoFile, 'video');
      videoUrl = result.secure_url;
    }

 
  // 2. Convert back to array
  const commonAttributes = req.body?.commonAttributes ? req.body.commonAttributes.split(',') : [];
  const specificAttributes = req.body?.specificAttributes ? req.body.specificAttributes.split(',') : [];
    // Create new property
    const newProperty = new Property({
      ...req.body,
      thumbnail: thumbnailUrl,
      images: imageUrls,
      videoTour: videoUrl,
      // tourPrice:req.body.tourPrice,
      commonAttributes,
      specificAttributes,
      price: Number(req.body.price),
      bedrooms: Number(req.body.bedrooms),
      bathrooms: Number(req.body.bathrooms),
      ownerId:req.user._id
    });

    // console.log(newProperty)
    await newProperty.save();

    res.status(201).json({
      success: true,
      data: newProperty
    });

  } catch (error) {
    console.error('Error creating property:', error);
    const statusCode = error.name === 'ValidationError' ? 400 : 500;
    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
};
// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private/Admin
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }

    res.json({
      success: true,
      data: property
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private/Admin
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }

    res.json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};


export const getPropertyNames= async (req, res) => {
  // console.log('hello from get')
  try {
    const properties = await Property.find({}, 'title');
    res.json(properties);
    // console.log(properties)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


export const getTenantProperties = async (req,res)=>{
  try {
    console.log(req.user)
    const leases = await Lease.find({user:req.user._id})
    // console.log(leases)
      .populate({
        path: "property",
        select: "ownerId title type location price commonAttributes specificAttributes thumbnail",
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
        Price:lease.property?.price,
        amenities:[...lease.property?.specificAttributes,...lease.property?.commonAttributes],
        image:lease.property?.thumbnail,
        landlord:lease.property?.ownerId?.name || 'N/A'
      };
    });
// console.log(tenants)
res.status(200).json(tenants)
  } catch (error) {
    console.log('error in getTenant properties '+error)
  }
}