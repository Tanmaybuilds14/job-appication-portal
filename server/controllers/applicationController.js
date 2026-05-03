import fs from 'fs';
import cloudinary from '../configs/cloudinary.js';
import applications from '../db_model/applicationDB.js';
import jobs from '../db_model/jobsDB.js';
import applicationDB from '../db_model/applicationDB.js';


const applyJob = async (req,res) => {
  try {
    const {jobId} = req.params;
    const {coverLetter} = req.body;

    const job = await jobs.findById(jobId);
    if(!job){
      return res.status(404).json({
        success:false,
        msg:'Job not found'
      });
    }

    const existingapplication = await applicationDB.findOne({
      applicant: req.user,
      job: jobId
    });

    if(existingapplication){
      return res.status(400).json({
        success:false,
        msg:'user already applied'
      });
    }

    if(!req.file){
      return res.status(400).json({
        success:false,
        msg:'File not found'
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "job-portal/resumes",
      resource_type: "auto"
    });

    const application = await applicationDB.create({
      applicant: req.user,
      job: jobId,
      resume: {
        url: result.secure_url,
        public_id: result.public_id
      }
    });

    fs.unlinkSync(req.file.path); 

    return res.status(200).json({
      success:true,
      msg:'application created successfully',
      data:application
    })
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error(error)
    return res.status(500).json({
      success:false,
      msg:error.message
    });
  }
}

const myApplications = async (req,res) => {
  try {
    const applications = await applicationDB.find({ applicant: req.user })
      .populate("job");
    
      res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success:false,
      msg:error.message
    });
  }
}

const getApplications = async (req,res) => {
  try {
    const { jobId } = req.params;

    const job = await jobs.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

     if (job.recruiter.toString() !== req.user) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view these applications"
      });
    }

    const applications = await applicationDB.find({ job: jobId })
      .populate("applicant", "name email skills education");

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success:false,
      msg:error.message
    })
  }
}

const withdrawApplication = async (req,res) => {
  try {
    const { id } = req.params;

    const application = await applicationDB.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    if (application.applicant.toString() !== req.user) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this application"
      });
    }

    await cloudinary.uploader.destroy(application.resume.public_id, {
      resource_type: "raw"
    });

    await application.deleteOne();

    res.status(200).json({
      success: true,
      message: "Application deleted successfully"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success:false,
      msg:error.message
    })
  }
}

export {applyJob,getApplications,myApplications,withdrawApplication};