import express from "express";
import cors from "cors";
import userController from "./controllers/userController.js";
import userValidator from "./middlewares/validator.js";
import connectDB from "./connectDB.js";
import dotenv from 'dotenv';
import logincontroller from "./controllers/loginController.js";

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

    //all routes
    app.post('/register',userValidator,userController);
    app.post('/login',logincontroller)
    app.get('/',(req,res)=>{
      res.status(200).json({msg:"server is running successfully"});
    });

    app.listen(PORT,()=>{
      console.log(`server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();