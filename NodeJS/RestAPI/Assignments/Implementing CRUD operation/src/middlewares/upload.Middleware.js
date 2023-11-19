import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./albumDB"); // Set the destination folder
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`); // Set the filename
  },
});

// Create the multer instance with the defined storage
const upload = multer({ storage });

export default upload;
