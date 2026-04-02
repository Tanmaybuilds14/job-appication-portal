import User from '../db_model/userDB';

const userController = async (req,res) => {
  try {
    const {
      username,
      email,
      password,
      logintype,
      education,
      skills
    } = req.body
    
    //checking for duplicate login email
    const duplicateUser = User.findOne({email});
    if(duplicateUser){
      return res.status(409).json({
        success: false,
        message: "User already exists with this email"
      });
    }
    

    const User = User.create({
      username,
      email,
      password,
      logintype,
      education,
      skills
    })

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      User:{
        _id: User._id,
        username: User.username,
        email: User.email,
        loginType: User.loginType,
        education: User.education,
        skills: User.skills,
        createdAt: User.createdAt
      }});

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({msg:error.message});
  }
}

export default userController
