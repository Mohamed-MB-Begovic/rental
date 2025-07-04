import dotenv from 'dotenv'
dotenv.config();


export const DB_URL=process.env.DB_URL
export const JWT_SECRET=process.env.JWT_SECRET



export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID
export const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET