import express from "express";
import {
  courseCreate,
  courseFindAll,
  courseFindAllWithLabs,
  courseUpdate
} from "../controllers/CourseController.js";

const router = express.Router();

router.post("/", courseCreate);
router.get("/", courseFindAll);
router.get("/labs", courseFindAllWithLabs);
router.put("/:code", courseUpdate)

export default router;
