import bcrypt from 'bcryptjs'
import mongoose from "mongoose";

const User = new mongoose.Schema({
 username:{
  type:String,
  required:[true,'name is required'],
  trim:true
 },
 email:{
  type:String,
  required:[true,'email is required'],
  unique:true,
  lowercase:true,
  trim:true
 },
 password:{
  type:String,
  required:[true,'password is true'],
  minlength:6,
  trim:true,
  select:false
 },
 logintype:{
  type:String,
  enum:['applicant','employer'],
  default:'applicant'
 },
 createdAt:{
    type: Date,
    default: Date.now,
  },
  education:[{
    degree:{type:String,required:true},
    institute:{type:String,required:true},
    startDate:{type:Date,required:true},
    passingDate:{type:Date,required:true,default:Date.now},
  }],
  skills:[{
    name:{type:String,required:true,trim},
    level:{type:String,enum:['beginner','intermediate','advanced']},
    experinece:{type: Number,min:0,default:0}
  }]
});

User.pre('save',async()=>{
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
})

module.exports = mongoose.model('user', User);