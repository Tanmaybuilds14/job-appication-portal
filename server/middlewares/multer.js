import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
  //destination for file uploads in the local system
  destination:function (req,file,cb){
    cb(null, "uploads");
  },
  //generating filename 
  filename: function(req,file,cb){
    const uniquename = Date.now()+"-"+Math.round(Math.random()*1e9);
    cb(null, uniquename+path.extname(file.originalname))
  }
});

const filefilter = (req, file, cb) => {
  //alowed file types
 const allowedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
 ];

 if(allowedTypes.includes(file.mimetype)){
  cb(null, true);
 }else{
  cb(new Error("Only PDF and DOC/DOCX files are allowed" ), false);
 }
};

const upload = multer({
  storage,
  filefilter
});

export default upload