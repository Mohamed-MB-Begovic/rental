import multer from "multer";
 

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedFields = ['thumbnail', 'images', 'videoTour'];
  if (!allowedFields.includes(file.fieldname)) {
    return cb(new Error(`Unexpected field: ${file.fieldname}`), false);
  }

  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
    files: 12 // 1 thumbnail + 10 images + 1 video
  }
}) 


export default upload;