import express from 'express'
import upload from '../../config/storage.js';
import { getItems, uploadFile } from '../controllers/FileController.js';

const router = express.Router()

router.get('/', (req, res) => {
    res.send('FileRoute')
})

router.get('/getitems', getItems)

router.post('/upload', upload.single("constancia"), uploadFile )

export default router