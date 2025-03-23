import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

export default async function connect() {
    try {
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure if needed
    }
}
