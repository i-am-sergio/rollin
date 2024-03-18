import express from "express";
import {
  getCourseByCode,
  getAllLabsByCourseCode,
  matriculateUserToLab,
} from "../controllers/MatriculateController";

const router = express.Router();

router.get("/:code", getCourseByCode);
router.get("/:code/labs", getAllLabsByCourseCode);
router.post("/:cui/:course/:group", matriculateUserToLab);

export default router;
