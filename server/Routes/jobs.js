import express from 'express'
import authmidlleware from '../middlewares/auth.js'
import jobValidator from '../middlewares/jobvalidator.js';
import { createJobs, deleteJobs, updatejobs } from '../controllers/jobsController.js';

const jobsRouter = express.Router();

router.post('/create',authmidlleware,jobValidator,createJobs);
router.put('/:id',authmidlleware,updatejobs);
router.delete('/:id',authmidlleware,deleteJobs);

export default jobsRouter