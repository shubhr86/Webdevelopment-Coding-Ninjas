import mongoose from "mongoose";
import { jobSchema } from "./job.schema.js";
import { applicatonSchema } from "./application.Schema.js";
import { likeSchema } from "./like.Schema.js";

const JobModel = mongoose.model("Job", jobSchema);

const ApplicationModel= mongoose.model('Application',applicatonSchema);

const likeModel= mongoose.model('Like',likeSchema);

export const applyJobRepo = async (job_id, user_id) => {
  try {
    // const createJob = new JobModel({
    //   title: "SDE-1",
    //   description:
    //     "coding ninjas is hiring for the position of SDE-1 on-site Gurgao-IN",
    //   company: "Coding Ninjas",
    //   salary: 1600000,
    // });
    // await createJob.save();
    const job = await JobModel.findById(job_id);
    console.log("job result is", job);
    if (!job) {
      return {
        success: false,
        error: { statusCode: 404, msg: "job not found" },
      };
    } else {
      job.applicants.push(user_id);
      const res = await job.save();
      return { success: true, res };
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};
export const postJobRepo= async (jobData)=>{
  try{
    const job= new JobModel(jobData);
    const savedJob= await job.save();
    return {success:true,job:savedJob};
  }catch(err){
    console.log(err);
    return{
      success:false,
      err:{statusCode:400,msg:err.message},
    }

  }
}