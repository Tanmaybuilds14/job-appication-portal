import mongoose from "mongoose";

const applications = new mongoose.Schema(
{
  applicant:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
  },
  job:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'jobs',
    required:true
  },
  resume:{
    type:String,
    required:true
  },
  status:{
    type:String,
    enum:["pending","reviewed","accepted","rejected"],
    default:"pending",
  }
},
{timestamps:true}
);

export default mongoose.model('applications',applications)