import mongoose from "mongoose";
import { DB_URL } from "./config.js";


export const Connect=async()=>{
try {
   await  mongoose.connect(DB_URL)
   console.log('connection success'+DB_URL)
    
} catch (error) {
    console.log('connection error')
}
} 


export default Connect;