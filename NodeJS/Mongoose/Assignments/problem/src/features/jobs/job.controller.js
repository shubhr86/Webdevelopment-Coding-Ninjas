// job.controller.js
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import { applicatonSchema } from "./application.Schema.js";
import { applyJobRepo, postJobRepo } from "./job.repository.js";
import { jobSchema } from "./job.schema.js";
import { likeSchema } from "./like.Schema.js";

export const applyJob = async (req, res, next) => {
  const { id } = req.params; 
  const job_Id = id;

  const resp = await applyJobRepo(job_Id, req._id);
  console.log(resp);
  if (resp.success) {
    res.status(200).json({
      success: true,
      msg: "Job applied successfully",
      resp: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

export const postJob = async (req, res, next) => {
  // Check if user type is "student" and prevent them from posting jobs
  const { type } = req.user;
 // console.log(type)
  if (type === "student") {
    return res.status(400).json({
      success: false,
      msg: "Sorry! Only recruiters are allowed to post a job.",
    });
  }

  const { title, description, company, salary } = req.body;
  const jobData = { title, description, company, salary };

  try {
    const { success, job, err } = await postJobRepo(jobData);

    if (success) {
      // Customize the success response
      res.status(201).json({
        success: true,
        msg: "Job posted successfully with,",
        job_description: job,  // Include the job details
      });
    } else {
      next(new customErrorHandler(err.statusCode, err.msg));
    }
  } catch (err) {
    next(new customErrorHandler(500, "Internal Server Error"));
  }
};
