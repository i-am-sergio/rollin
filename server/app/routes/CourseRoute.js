import express from "express";
import {
  courseCreate,
  courseFindAll,
  courseFindAllWithLabs,
} from "../controllers/CourseController.js";

const router = express.Router();

router.post("/", courseCreate);
router.get("/", courseFindAll);
router.get("/labs", courseFindAllWithLabs);

export default router;
