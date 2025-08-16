import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB:", process.env.MONGO_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
    
    const options = {
      serverSelectionTimeoutMS: 10000, // Keep trying to connect for 10 seconds
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      maxPoolSize: 10, // Maintain up to 10 socket connections
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferCommands: false // Disable mongoose buffering
    };
    
    const conn = await mongoose.connect(process.env.MONGO_URI, options);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error(`❌ Error Code: ${error.code}`);
    console.error(`❌ Full Error:`, error);
    
    // Don't exit immediately, let the app continue and retry
    setTimeout(() => {
      console.log("🔄 Retrying MongoDB connection...");
      connectDB();
    }, 5000);
  }
};

export default connectDB;