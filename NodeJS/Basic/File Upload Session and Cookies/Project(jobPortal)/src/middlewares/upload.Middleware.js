// uploadMiddleware.js
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/resume'); // Set the destination for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}-${file.fieldname}.pdf`); // Add the .pdf extension to the filename
  },
});

const upload = multer({ storage });

export default upload;
