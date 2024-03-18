import express from 'express'
import { userMatriculate } from '../controllers/UserController';

const router = express.Router()

router.post("/matriculate", userMatriculate)

export default router