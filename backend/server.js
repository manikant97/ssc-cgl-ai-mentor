import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./src/app.js";

// Load environment variables
dotenv.config();

// MongoDB connection
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn("MONGO_URI not found in .env file. Using default local connection.");
      process.env.MONGO_URI = "mongodb://127.0.0.1:27017/ssc-cgl";
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

// Initialize database connection and start server
const startServer = async () => {
  try {
    await connectDB();
    
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${PORT}`);  
      console.log(`Health check: http://localhost:${PORT}/health`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error('Unhandled Rejection:', err);
      if (server) {
        server.close(() => process.exit(1));
      } else {
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the application
startServer();
