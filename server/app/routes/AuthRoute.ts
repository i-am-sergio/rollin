import express from 'express'
import upload from '../../config/storage';
import { loginUser, registerUser } from '../controllers/AuthController'

const router = express.Router()

router.post('/register', upload.single("constancia"), registerUser)
router.post('/login', loginUser)

export default router