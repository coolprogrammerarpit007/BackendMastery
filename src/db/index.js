import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async ()=>{
    // console.log(`${process.env.MONGODB_URI}/${DB_NAME}`);
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    }

    catch(error)
    {
        // console.log(' THERE IS A CONNECTION ERROR ARPIT!');
        console.log("MONGODB connection error ",error);
        process.exit(1);
    }
}

export default connectDB;