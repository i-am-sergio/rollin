import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/");
    },
    filename: function (req, file, cb) {
      const date = new Date();
      const timestamp = date.getTime();
      const originalname = file.originalname;
      const filename = `${timestamp}-${originalname}`;
      cb(null, filename);
    },
  });

const upload = multer({ storage: storage });

export default upload;