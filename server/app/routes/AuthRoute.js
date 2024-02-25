import express from 'express'
import upload from '../../config/storage.js';
import { loginUser, registerUser } from '../controllers/AuthController.js'

const router = express.Router()

router.post('/register', upload.single("constancia"), registerUser)
router.post('/login', loginUser)

export default router