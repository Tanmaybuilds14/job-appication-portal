import jwt from 'jsonwebtoken';
import user from '../db_model/userDB.js';
import dotenv from 'dotenv';
dotenv.config();

const authmidlleware = (req,res,next) =>{
 try {
  const authheader  = req.headers.authorization;
 if(!authheader || !authheader.startsWith('Bearer ')){
  return res.status(401).json({msg:'token not found'});
 }
 //extracting actual token
  const token = authheader.split(" ");
 //verifying extracted token
  const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
 //sending decoded payload
  req.user = decoded;
  next();
 } catch (error) {
  console.error(error.message);
  return res.status(500).json({msg:'internal server error'});
 }
}