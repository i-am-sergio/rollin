import express from 'express'
import { userMatriculate } from '../controllers/UserController.js';

const router = express.Router()

router.post("/matriculate", userMatriculate)

export default router