import {getApplicantsForJob, getAllJobs, findJobById, createJob, updateJob, deleteJob, addApplicantToJob } from '../model/job.model.js';
import { sendConfirmationEmail } from '../middlewares/email.Middleware.js';

const gethome=(req,res) =>{
    res.render('index.ejs')
};
const applyJobs=(req,res) =>{
  const jobId = parseInt(req.params.id);
  const job = findJobById(jobId); 
  res.render('apply-jobs', { job });
}

const getAllJobsController = (req, res) => {
  const jobs = getAllJobs();
  res.render('jobs', { jobs });
};
  const createjob= (req, res) =>{
    res.render('create-job', { user: req.user });
  }


const getJobDetailsController = (req, res) => {
  const jobId = parseInt(req.params.id);
  const job = findJobById(jobId);
  console.log("Jobs  Testing",job);
  if (job) {
    // If the job is found, render the job details view
    res.render('jobsdetails', { job });
   } 
  else {
    // Handle the case when the job is not found
    res.redirect("/404");
  }
};


const createJobController = (req, res) => {
  // Handle job creation form submission
  const newJob = req.body;
  const user = req.user; 
  newJob.userId = user.id; // Set the userId for the new job
  createJob(newJob);

  // Redirect the user to "jobs/my" after creating the job and pass userJobs
  const userJobs = getAllJobs().filter(job => job.userId === user.id);
  res.render('user-created-jobs', { user, jobs: userJobs });
};



const showUserCreatedJob = (req, res) => {
  if (req.session.user && req.session.user.id) {
    const userId = req.session.user.id;

    const userJobs = getAllJobs().filter(job => job.userId === userId);

    if (userJobs.length > 0) {
      res.render('user-created-jobs', { user: req.user, jobs: userJobs });
    } else {
      res.render('user-created-jobs', { user: req.user, jobs: [] });
    }
   } 
   else {
    res.redirect("/404");
  }
};


// after showing jobs user manage jobs

const jobupdate = (req, res) => {
  if (req.session.user && req.session.user.id) {
    const jobId = parseInt(req.params.id);
    const job = findJobById(jobId);  
    const user = req.user; 

    if (req.session && req.session.user && req.session.user.id) {
          res.render('update-job', { user, job });
        } 
        
       } else {
        res.redirect("/404");
      }
    };






const deleteJobController = (req, res) => {
  const jobId = parseInt(req.params.id);
  const userId = req.user.id; // Assuming you have the user's ID in the user object
  const job = findJobById(jobId);

    if (job && job.userId === userId) {
      // delte the job 
      deleteJob(jobId);
      
      const userJobs = getAllJobs().filter(userJob => userJob.userId === userId);
      
      // Pass the userJobs to the user-created-jobs view
      res.render('user-created-jobs', { jobs: userJobs });
  } 
  else {
    // Handle unauthorized deletion attempt (job not found or not owned by the user)
    res.redirect("/404");
 }
};

const updateJobController = (req, res) => {
  const jobId = parseInt(req.params.id);
  const userId = req.user.id; 

  // Retrieve the updated job data from the request body
  const updatedJobData = {
    companyName: req.body.companyName,
    category: req.body.category,
    designation: req.body.designation,
    location: req.body.location,
    applyBy: req.body.applyBy,
    skillsRequired: req.body.skillsRequired,
    openings: req.body.openings,
    posted: req.body.posted,
    applicants: req.body.applicants,
    salary: req.body.salary
  };

  // Check if the job exists and belongs to the user
  const job = findJobById(jobId);

  if (job && job.userId === userId) {
    // Update the job with the new data
    updateJob(jobId, updatedJobData);
    
    // You can fetch the updated user's jobs and render them
    const userJobs = getAllJobs().filter(userJob => userJob.userId === userId);
    
    // Pass the userJobs to the user-created-jobs view
    res.render('user-created-jobs', { jobs: userJobs });
  } 
  else {
    // Handle unauthorized update
    res.redirect("/404");
    }
};

const applicantlist = (req, res) => {
  const jobId = parseInt(req.params.id);
  const job = findJobById(jobId);
 const applicants = getApplicantsForJob(jobId);

  res.render('applicantList', { job, applicants });
};


const addApplicantToJobController = (req, res) => {
  const jobId = parseInt(req.params.id);
  const applicant = req.body; 
  addApplicantToJob(jobId, applicant);
  res.redirect(`/jobs/${jobId}`);
};
const applyJobSubmitController = (req, res) => {
  const { name, email, contact } = req.body; 

  const jobId = parseInt(req.params.id);
  const applicant = {
    name,
    email,
    contact,
    resumePath: req.file.filename,
  };

  // Save the applicant to the job
  addApplicantToJob(jobId, applicant);
  const jobTitle = 'jobTittle';

  sendConfirmationEmail(applicant.email, jobTitle);


  // Redirect to job
  res.redirect('/jobs');
};


// Function to process search requests
const searchJobs = (req, res) => {
  const query = req.query.query;
  const allJobs = getAllJobs();

  const searchResults = allJobs.filter((job) => {
    // For example, search in job titles and company names (modify this as needed)
    return job.companyName.toLowerCase().includes(query.toLowerCase())
  });

  // Render the search results in a dedicated view
  res.render('search-results', { query, results: searchResults });
};


export {createjob,searchJobs, applicantlist,jobupdate, showUserCreatedJob,applyJobSubmitController, applyJobs, gethome, getAllJobsController, getJobDetailsController, createJobController, updateJobController, deleteJobController, addApplicantToJobController };
