import express from 'express'
import authmidlleware from '../middlewares/auth.js'
import jobValidator from '../middlewares/jobvalidator.js';
import { createJobs, deleteJobs, getAllJobs, getJobById, updatejobs } from '../controllers/jobsController.js';

const jobsRouter = express.Router();

jobsRouter.get('/', getAllJobs);
jobsRouter.get('/:id', getJobById);
jobsRouter.post('/create',authmidlleware,jobValidator,createJobs);
jobsRouter.put('/:id',authmidlleware,updatejobs);
jobsRouter.delete('/:id',authmidlleware,deleteJobs);

export default jobsRouter