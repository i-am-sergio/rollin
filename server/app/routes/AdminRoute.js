import express from 'express'
import { getUserByCui, getUsers } from '../controllers/AdminController.js'

const router = express.Router()

router.get('/users', getUsers)
router.get('/users/:cui', getUserByCui)
// router.get('/users/:Labid', getStudentsByLab)

export default router
