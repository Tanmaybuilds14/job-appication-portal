import express from 'express';
import {createUser,updateUser,deleteUser} from '../controllers/userController.js';
import userValidator from '../middlewares/uservalidator.js';
import logincontroller from '../controllers/loginController.js';

const userRouter = express.Router();


userRouter.post('/register',userValidator,createUser);
userRouter.post('/login',logincontroller);
userRouter.put('/user/:id',updateUser);
userRouter.delete('/user/:id',deleteUser);
userRouter.get('/',(req,res)=>{
  res.status(200).json({msg:"server is running successfully"});
});

export default userRouter