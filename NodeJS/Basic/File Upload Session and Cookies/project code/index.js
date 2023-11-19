import express from 'express';
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { authenticateRecruiter, checkRecruiterSession } from './src/middlewares/auth.js';
import upload from './src/middlewares/upload.Middleware.js';
import { trackLastVisit } from './src/middlewares/lastVist.Middleware.js';
import {
  applicantlist,createjob,
  applyJobSubmitController,jobupdate,
  gethome,
  applyJobs,
  getAllJobsController,
  getJobDetailsController,
  showUserCreatedJob,
  createJobController,
  updateJobController,
  deleteJobController,
  addApplicantToJobController,
  searchJobs,
} from './src/controller/job.controller.js';
import {
  errorMessage,
  getAllUsersController,
  registerUserController,
  loginUserController,
  logoutUserController,
} from './src/controller/user.controller.js';

const app = express();

// setting up cookies
app.use(cookieParser());
app.use(trackLastVisit);

app.use(session({
  secret: 'secret-key', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));

// View engine setup
app.use(expressEjsLayouts);
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./src/views'));

// Body parser setup
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder setup
app.use(express.static(path.join('src', 'public')));
app.use(express.static(path.join('src', 'public/images')));

// Routes for job-related operations
app.get('/', gethome);
app.get('/apply/:id', applyJobs);
app.get('/jobs', getAllJobsController);
app.get('/jobdetails/:id', getJobDetailsController);
app.get('/login', loginUserController);
app.get('/register', registerUserController);
app.get('/postjobs', authenticateRecruiter,createjob) ;
app.get('/logout', logoutUserController);

app.get('/jobs/my', authenticateRecruiter,checkRecruiterSession, showUserCreatedJob);
app.get('/jobs/:id/edit', authenticateRecruiter,jobupdate);


// Add Multer middleware here for file uploads
app.post('/postjobs', authenticateRecruiter, createJobController);
app.post('/jobs/:id', authenticateRecruiter, updateJobController); // Protect this route with authenticateRecruiter
app.post('/jobs/:id/delete', authenticateRecruiter, deleteJobController); // Protect this route with authenticateRecruiter
app.post('/jobs/:id/applicants', authenticateRecruiter, addApplicantToJobController); // Protect this route with authenticateRecruiter
app.post('/apply/:id', upload.single('resume'), applyJobSubmitController);

// Routes for user-related operations
app.get('/users', getAllUsersController);
app.post('/register', registerUserController);
app.post('/login',  loginUserController);
app.post('/logout', logoutUserController);

// ... other routes ...
app.get('/jobs/:id/update', authenticateRecruiter, updateJobController);
app.get('/jobs/:id/delete', authenticateRecruiter, deleteJobController); // Protect this route with authenticateRecruiter
app.post('/jobs/:id/update', authenticateRecruiter, updateJobController);
app.get('/job/applicant/:id',authenticateRecruiter,applicantlist)
app.get('/search', searchJobs);
app.get('/404',errorMessage);
export default app;
