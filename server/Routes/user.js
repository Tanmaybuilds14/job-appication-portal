import express from 'express';
import {createUser,updateUser,deleteUser} from '../controllers/userController.js';
import userValidator from '../middlewares/uservalidator.js';
import logincontroller from '../controllers/loginController.js';

const userRouter = express.Router();


router.post('/register',userValidator,createUser);
router.post('/login',logincontroller);
router.put('/user/:id',updateUser);
router.delete('/user/:id',deleteUser);
router.get('/',(req,res)=>{
  res.status(200).json({msg:"server is running successfully"});
});

export default userRouter