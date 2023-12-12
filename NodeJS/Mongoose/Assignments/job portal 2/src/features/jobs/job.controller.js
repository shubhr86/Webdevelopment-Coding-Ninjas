// Please don't change the pre-written code
// Import the necessary modules here

import { customErrorHandler } from "../../middlewares/errorHandler.js";
import { applyJobRepo, createNewJob, findJobRepo } from "./job.repository.js";

export const postJob = async (req, res, next) => {
  // Enhance the functionality of this controller to ensure that only users of the 'recruiter' type can post a new job.
  const { type: userType } = req.user;
  console.log(userType)

  try {
    if (userType !== 'recruiter') {
      return res.status(400).json({ success: false, msg: "Only recruiters are allowed to post jobs" });
    }

    const resp = await createNewJob(req.body);
    if (resp) {
      res.status(201).json({
        success: true,
        msg: "job posted successfully with ",
        job_description: resp,
      });
    } else {
      res.status(400).json({ success: false, msg: "bad request" });
    }
  } catch (error) {
    next(new customErrorHandler(400, error));
  }
};
// export const applyJob = async (req, res, next) => {
//   const job_id = req.params.id;
//   const user_id = req.user._id;
//   try {
//     const job_description = await findJobRepo(job_id);
//     if (!job_description) {
//       return next(new customErrorHandler(400, "job not found"));
//     }
//     const resp = await applyJobRepo(job_id, user_id);
//     console.log(resp);
//     if (resp) {
//       res
//         .status(201)
//         .json({ success: true, msg: "job applied successfully", resp });
//     } else {
//       res
//         .status(400)
//         .json({ success: false, msg: "you have already applied for this job" });
//     }
//   } catch (error) {
//     next(new customErrorHandler(400, error));
//   }
// }
export const applyJob = async (req, res, next) => {
  const job_id = req.params.id;
  const user_id = req.user._id;

  try {
    const job_description = await findJobRepo(job_id);
    if (!job_description) {
      return next(new customErrorHandler(400, "Job not found"));
    }

    const updatedJob = await applyJobRepo(job_id, user_id);
    if (!updatedJob) {
      return res.status(400).json({
        success: false,
        msg: "You have already applied for this job",
      });
    }

    res.status(201).json({
      success: true,
      msg: "Job applied successfully",
      resp: {
        title: updatedJob.title,
        description: updatedJob.description,
        company: updatedJob.company,
        salary: updatedJob.salary,
        applicants: updatedJob.applicants, // Array of user IDs who applied
        _id: updatedJob._id,
        
      },
    });
  } catch (error) {
    next(new customErrorHandler(400, error));
  }
};
