import express from 'express'
import { getCourseByCode } from '../controllers/MatriculateController.js';

const router = express.Router()

router.get("/:code", getCourseByCode)

export default router