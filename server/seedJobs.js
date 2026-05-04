import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Jobs from './db_model/jobsDB.js';
import User from './db_model/userDB.js';
import connectDB from './configs/connectDB.js';

dotenv.config();

const seedJobs = async () => {
  try {
    await connectDB();

    // Find a recruiter (employer) to associate the jobs with
    let recruiter = await User.findOne({ logintype: 'employer' });

    if (!recruiter) {
      console.log('No recruiter (employer) found. Creating a dummy recruiter...');
      recruiter = await User.create({
        username: 'Dummy Recruiter',
        email: 'recruiter@example.com',
        password: 'password123',
        logintype: 'employer',
      });
      console.log('Dummy recruiter created:', recruiter._id);
    }

    const dummyJobs = [
      {
        title: 'Senior Frontend Engineer',
        company: 'TechCorp Solutions',
        salary: 120000,
        description: 'We are looking for a Senior Frontend Engineer proficient in React and modern CSS. You will be responsible for building high-performance web applications.',
        recruiter: recruiter._id,
      },
      {
        title: 'Backend Developer (Node.js)',
        company: 'InnovateSoft',
        salary: 110000,
        description: 'Join our backend team to build scalable APIs using Node.js, Express, and MongoDB. Experience with microservices is a plus.',
        recruiter: recruiter._id,
      },
      {
        title: 'Full Stack Developer',
        company: 'StartupHub',
        salary: 105000,
        description: 'Looking for a versatile developer who can handle both frontend and backend tasks. Must be comfortable with MERN stack.',
        recruiter: recruiter._id,
      },
      {
        title: 'UI/UX Designer',
        company: 'Creative Studio',
        salary: 95000,
        description: 'Design beautiful and intuitive user interfaces for our clients. Proficiency in Figma and Adobe XD is required.',
        recruiter: recruiter._id,
      },
      {
        title: 'DevOps Engineer',
        company: 'CloudSystems',
        salary: 130000,
        description: 'Help us automate our infrastructure and deployment pipelines. Experience with AWS, Docker, and Kubernetes is essential.',
        recruiter: recruiter._id,
      }
    ];

    await Jobs.insertMany(dummyJobs);
    console.log('Successfully seeded 5 dummy jobs!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedJobs();
