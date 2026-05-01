import express from 'express';
import { applyJob,getApplications,myApplications,withdrawApplication } from '../controllers/applicationController.js'
import authmiddleware from '../middlewares/auth.js'
import upload from '../middlewares/multer.js';

const applicationRouter = express.Router();

applicationRouter.post("/applications/:jobId", authmiddleware, upload.single("resume"), applyJob);
applicationRouter.get("/applications/me", authmiddleware, myApplications);
applicationRouter.get("/applications/job/:jobId", authmiddleware, getApplications);
applicationRouter.delete("/applications/:id", authmiddleware, withdrawApplication);

export default applicationRouter;