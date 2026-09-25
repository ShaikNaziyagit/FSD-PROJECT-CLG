import mongoose from 'mongoose';
import { ensureDemoAccounts } from '../utils/autoSeed.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campusos', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    await ensureDemoAccounts();
  } catch (error) {
    console.error(`[Database Error] Could not connect to MongoDB: ${error.message}`);
    console.warn(`[Database Warning] Running in offline/mock-ready mode if database is unavailable.`);
  }
};

export default connectDB;

