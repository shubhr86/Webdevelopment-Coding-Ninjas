// Please don't change the pre-written code
import {mongoose} from 'mongoose';

import { jobSchema } from "./schema/newJob.schema.js";
import {applyJobSchema} from "./schema/applyJob.schema.js"
import {customErrorHandler} from "../../middlewares/errorHandler.js"

const ApplyJobModel = mongoose.model('ApplyJob', applyJobSchema);
const JobModel = mongoose.model('Job', jobSchema);


export const createNewJob = async (job) => {
  // Write your code here
  try {
    const newJob = new JobModel(job);
    const savedJob = await newJob.save();
    return savedJob;
  } catch (error) {
    throw new customErrorHandler(400, error.message);
  }
};

// export const applyJobRepo = async (jobId, userId) => {
//   // Write your code here
//   try {
//     const job = await JobModel.findById(jobId);
//     if (!job) {
//       return false;
//     }

//     job.applicants = job.applicants || [];

//     if (job.applicants.includes(userId)) {
//      // return false; // User has already applied for this job
//      throw new customErrorHandler(400,"User already applied");

//     }

//     job.applicants.push(userId);
//     await job.save();

//     const applyJob = new ApplyJobModel({ jobId, userId });
//     await applyJob.save();

//     return true;
//   } catch (error) {
//     throw new customErrorHandler(400, error.message);
//   }
// };
export const applyJobRepo = async (jobId, userId) => {
  try {
    const job = await JobModel.findById(jobId);

    if (!job) {
      return false; // Job not found
    }

    if (!job.applicants) {
      job.applicants = [];
    }

    if (job.applicants.includes(userId)) {
      return false; // User has already applied for this job
    }

    job.applicants.push(userId);
    await job.save();

    // Fetch the updated job details after applying
    const updatedJob = await JobModel.findById(jobId);

    return updatedJob; // Return the updated job details
  } catch (error) {
    throw new customErrorHandler(400, error.message);
  }
};


export const findJobRepo = async (_id) => {
  // Write your code here

  try {
    const job = await JobModel.findById(_id);
    return job;
  } catch (error) {
    throw new customErrorHandler(400, error.message);
  }
};
