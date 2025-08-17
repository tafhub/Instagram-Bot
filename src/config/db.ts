import mongoose from 'mongoose';
import logger from './logger';

export const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://gbolagadewinner:gbolagadewinner@backenddb.73ves.mongodb.net', {
      // These options are no longer necessary
    });
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
