import mongoose from "mongoose";

const Jobs = new mongoose.Schema(
{
  title:{
    type:String,
    required:[true,'Title is required'],
    trim:true
  },
  company:{
    type:String,
    required:[true,'Company name is required'],
    trim:true
  },
  salary:{
    type:Number,
    required:true,
    trim:true
  },
  description:{
    type:String,
    required:true,
    trim:true
  },
  recruiter:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
  },
},
{timestamps:true}
);

export default mongoose.model('jobs',Jobs)