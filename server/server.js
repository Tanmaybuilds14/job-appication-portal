import express, { Router } from "express";
import cors from "cors";
import connectDB from "./connectDB.js";
import dotenv from 'dotenv';
import userRouter from './Routes/user.js'

dotenv.config();

const PORT = 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize server
const startServer = async () => {
  try {
    // Initialize database before starting server
    await connectDB();

    app.use('/api',userRouter);
    

    app.listen(PORT,()=>{
      console.log(`server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();