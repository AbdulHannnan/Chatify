import mongoose from 'mongoose';
import { ENV } from './env.js';

const connectDB = async ()=>{
    try{

        // After the CodeRabit Review 
        const {MONGO_URI} = ENV;
        if(!MONGO_URI){
            throw new Error('MONGO_URI is missing in .env file');
        }

        await mongoose.connect(ENV.MONGO_URI);
        console.log('MongoDB connected successfully:', mongoose.connection.host);
    }
    catch(error){
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;