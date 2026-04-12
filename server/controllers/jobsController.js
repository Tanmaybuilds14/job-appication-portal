import jobs from "../db_model/jobsDB.js";

const createJobs = async (req,res) => {
  try {
    const {title,company,salary,description} = req.body;

    const newJob = await jobs.create({
      title:title,
      company:company,
      salary:salary,
      description:description,
      recruiter:req.user.id
    });

    return res.status(200).json({
      success:true,
      data:newJob
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json('Internal server error');
  }
}

const updatejobs = async (req,res) => {
  try {
    const {id} = req.params;
    const {title,company,salary,description} = req.body;
    //check if the job exists or not
    const job = await jobs.findById(id);
    if(!job){
      return res.status(404).json({
        success:false,
        msg:'Resource not found'
      })
    }

    job.title = title || job.title;
    job.company = company || job.company;
    job.salary = salary || job.salary;
    job.description = description || job.description;

    const updatedjob = await job.save();

    res.status(200),json({
      success:true,
      data:updatedjob
    });
 
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success:false,
      msg:'Internal server error'
    });
  }
}

const deleteJobs = async (req,res) => {
  try {
    const {id} = req.params;
    
    const job = await jobs.findById(id);
    if(!job){
      return res.status(404).json({
        success:false,
        msg:'Resource not found'
      });
    }

    await job.deleteOne();

    return res.status(200).json({
      success:true,
      msg:'Resource deleted successfully'
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success:false,
      msg:'Internal server error'
    });
  }
}

export {createJobs,updatejobs,deleteJobs}