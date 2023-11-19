// Please don't change the pre-written code
// Import the necessary modules here

// Write your code here
import multer from 'multer';

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');

  },
  filename: (req, file, cb) => {
    const name =
      Date.now() + '-' + file.originalname;
    cb(null, name);
    
  },
});

const imageUpload = multer({
    storage: storageConfig,
});
export default imageUpload;