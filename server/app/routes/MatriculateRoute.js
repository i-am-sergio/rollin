import express from 'express'
import { getCourseByCode, getAllLabsByCourseCode } from '../controllers/MatriculateController.js';

const router = express.Router()

router.get("/:code", getCourseByCode)
router.get("/:code/labs", getAllLabsByCourseCode)

export default router