import jwt from 'jsonwebtoken';
import User from '../db_model/userDB.js';

const authmidlleware = async (req,res,next) =>{
 try {
  const authheader  = req.headers.authorization;

 if(!authheader || !authheader.startsWith('Bearer ')){
  return res.status(401).json({msg:'token not found'});
 }

 //extracting actual token
  const token = authheader.split(" ")[1];
 //verifying extracted token
  const secret = process.env.JWT_SECRET_KEY;
  console.log('Verifying token with secret:', secret ? 'EXISTS' : 'UNDEFINED');
  if(!secret){
    return res.status(401).json({success: false, msg:'JWT_SECRET_KEY not configured'});
  }
  const decoded = jwt.verify(token, secret);
 
 //check if user exists in database
  const user = await User.findById(decoded.id);
  if(!user){
    return res.status(404).json({msg:'user not found in database'});
  }
  
 //sending decoded payload
  req.user = decoded.id;
  next();
 } catch (error) {
  console.error('Auth error:', error.message);
  if(error.name === 'JsonWebTokenError' || error.name === 'SyntaxError'){
    return res.status(401).json({success: false, msg:'invalid or malformed token'});
  }
  if(error.name === 'TokenExpiredError'){
    return res.status(401).json({success: false, msg:'token expired'});
  }
  if(error.kind === 'ObjectId'){
    return res.status(404).json({success: false, msg:'user not found'});
  }
  return res.status(401).json({success: false, msg:'authentication failed'});
 }
}


export default authmidlleware