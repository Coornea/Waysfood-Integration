// Import Package
const multer = require("multer");

exports.uploadFiles = (imageFile) => {
   // Init Multer Diskstorage
   const storage = multer.diskStorage({
      destination: (req, file, cb) => {
         cb(null, "uploads");
      },
      filename: (req, file, cb) => {
         cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
      },
   });

   // Add Filter For Uploads
   const fileFilter = (req, file, cb) => {
      if (file.filename === imageFile) {
         if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = {
               message: "Only image files are allowed!",
            };
            return cb(new Error("Only image files are allowed!"), false);
         }
      }
      cb(null, true);
   };
   const sizeInMb = 10;
   const maxSize = sizeInMb * 1000 * 1000;

   const upload = multer({
      storage,
      fileFilter,
      limits: {
         fileSize: maxSize,
      },
   }).single(imageFile);

   return (req, res, next) => {
      upload(req, res, function (error) {
         if (req.fileValidationError) {
            return res.status(400).send(fileValidationError);
         }
         if (!req.file && !error) {
            return res.status(400).send({
               message: "Please select files to upload!",
            });
         }
         if (error) {
            console.log(error);
            if (error.code === "LIMIT_FILE_SIZE") {
               return res.status(413).send({
                  message: "File is too large, maximum file size 10MB!",
               });
            }
            return res.status(400).send({ message: error });
         }
         return next();
      });
   };
};
