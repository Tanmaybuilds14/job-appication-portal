import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import user from "../db_model/userDB.js";

const logincontroller = async (req,res)=>{
  try {
    const {email,password,logintype} = req.body;
    //returns a object if user is found
    const User = await user.findOne({email}).select("+password");

    //if user is not found case:
    if(!User){
      return res.status(400).json({
       success:false,
       msg:'Invalid email or password'
      });
    }

    // Verify logintype matches
    if (logintype && User.logintype !== logintype) {
      return res.status(400).json({
        success: false,
        msg: `This account is registered as an ${User.logintype}. Please select the correct role.`
      });
    }

    //if user is found matching password:
    const ismatch = await bcrypt.compare(password,User.password);

    //if password dosent matches the actual password:
    if(!ismatch){
      return res.status(400).json({
        success:false,
        msg:'Invalid email or password'
      })
    }
    const secret = process.env.JWT_SECRET_KEY;
    console.log('Creating token with secret:', secret ? 'EXISTS' : 'UNDEFINED');
    if(!secret){
      return res.status(500).json({success: false, msg:'JWT_SECRET_KEY not configured'});
    }
    const token = jwt.sign(
      {
      id:User._id,
      email:User.email,
      logintype:User.logintype
      },
      secret,
      { expiresIn: "7d" }
    );
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({success: false, msg:'Internal server error', error: error.message});
  }
}

export default logincontroller