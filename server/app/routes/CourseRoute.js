import express from "express";
import {
  courseCreate,
  courseFindAll,
  courseFindAllWithLabs,
  courseAddLab,
  courseDeleteLab,
  courseUpdate
} from "../controllers/CourseController.js";

const router = express.Router();

router.post("/", courseCreate);
router.get("/", courseFindAll);
router.get("/labs", courseFindAllWithLabs);
router.post("/addLab", courseAddLab);
router.post("/deleteLab", courseDeleteLab);
router.put("/:code", courseUpdate)

export default router;
