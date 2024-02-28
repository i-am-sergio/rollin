import express from "express";
import {
  courseCreate,
  courseFindAll,
  courseFindAllWithLabs,
} from "../controllers/CourseController.js";

const router = express.Router();

router.post("/course/create", courseCreate);
router.get("/course/", courseFindAll);
router.get("/course/labs", courseFindAllWithLabs);

export default router;
