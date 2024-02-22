import express from 'express'
import { getItems, uploadFile } from '../controllers/FileController.js';
import { registerUser } from '../controllers/UserController.js';
import multer from 'multer'

const router = express.Router()


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

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.get('/getitems', getItems)

router.post('/upload', upload.single("constancia"), uploadFile )

router.post("/register", upload.single("constancia"), registerUser)

export default router