import multer from 'multer';

const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'uploads');
    },
    filename: function(req,file,cb){
        const addtionalInfo= Date.now()+'-';
        cb(null, addtionalInfo + file.originalname)
    }
})
const upload = multer({
    storage:storage
})
export default upload;