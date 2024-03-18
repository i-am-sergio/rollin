import express from 'express'
import upload from '../../config/storage';
import { getItems, uploadFile } from '../controllers/FileController';

const router = express.Router()

router.get('/', (req, res) => {
    res.send('FileRoute')
})

router.get('/getitems', getItems)

router.post('/upload', upload.single("constancia"), uploadFile )

export default router