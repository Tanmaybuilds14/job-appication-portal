import user from "../db_model/userDB.js";

const userController = async (req,res) => {
  try {
    const {
      username,
      email,
      password,
      logintype,
      education = [],
      skills = []
    } = req.body
    
    //checking for duplicate login email
    const duplicateUser = await user.findOne({email});
    if(duplicateUser){
      return res.status(409).json({
        success: false,
        message: "User already exists with this email"
      });
    }
    

    const newUser = await user.create({
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
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        loginType: newUser.logintype,
        education: newUser.education,
        skills: newUser.skills,
        createdAt: newUser.createdAt
      }});

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({msg:error.message});
  }
}

export default userController
