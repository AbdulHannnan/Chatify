import mongoose from 'mongoose';

const connectDB = async ()=>{
    try{

        // After the CodeRabit Review 
        const {MONGO_URI} = process.env;
        if(!MONGO_URI){
            throw new Error('MONGO_URI is missing in .env file');
        }

        mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully:', mongoose.connection.host);
    }
    catch(error){
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;