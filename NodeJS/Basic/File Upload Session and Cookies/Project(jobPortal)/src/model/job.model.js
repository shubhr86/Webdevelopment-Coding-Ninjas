let lastUserId = 1;


class Job {
  constructor(id,userId, category, jobTittle, designation, location, companyName, salary, applyBy, skillsRequired, openings, posted, applicants) {
    this.id = id;
    this.userId = lastUserId;
    lastUserId++;
    this.category = category;
    this.jobTittle= jobTittle;
    this.designation = designation;
    this.location = location;
    this.companyName = companyName;
    this.salary = salary;
    this.applyBy = applyBy;
    this.skillsRequired = skillsRequired;
    this.openings = openings;
    this.posted = posted;
    this.applicants = applicants;
  }
}

const jobs = [
  new Job(1, 1, "TECH", "Oppertunity of Software Developer", "SDE", "New York", "ADC ltd.", "50K", new Date(), "JAVA, JS", 5, "10 Oct 2023",[]),
];

const getAllJobs = () => {
  return jobs;
};

const findJobById = (id) => {
  return jobs.find((job) => job.id === id);
 
};

const createJob = (job) => {
  job.id = jobs.length + 1;
  jobs.push(job);
};

const updateJob = (id, updatedJob) => {
  const jobIndex = jobs.findIndex((job) => job.id === id);
  if (jobIndex !== -1) {
    jobs[jobIndex] = { ...jobs[jobIndex], ...updatedJob };
  }
};

const deleteJob = (id) => {
  const jobIndex = jobs.findIndex((job) => job.id === id);
  if (jobIndex !== -1) {
    jobs.splice(jobIndex, 1);
  }
};

const addApplicantToJob = (id, applicant) => {
  const job = findJobById(id);
  if (!job.applicants) {
    job.applicants = [];
  }

  job.applicants.push(applicant);
};


const getApplicantsForJob = (jobId) => {
  const job = findJobById(jobId);

  if (job && job.applicants) {
    return job.applicants;
  } else {
    return [];
  }
};



export { getApplicantsForJob, getAllJobs, findJobById, createJob, updateJob, deleteJob, addApplicantToJob,Job };
