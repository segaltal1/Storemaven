import mongoose, { ConnectOptions } from "mongoose";

const dbName = 'STORMAVEN_DB';
const uri = "mongodb://127.0.0.1/";

export const connectDB = async () => {
    try {
        await mongoose.connect(uri + dbName);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
        process.exit(1);
    }
}