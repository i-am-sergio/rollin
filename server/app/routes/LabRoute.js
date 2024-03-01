import express from "express";
import {
  labCreate,
  labFindAll,
  labFindByCourse,
  labDeleteByCourse,
} from "../controllers/LabController.js";

const router = express.Router();

router.post("/", labCreate);
router.get("/", labFindAll);
router.get("/:course", labFindByCourse);
router.delete("/:group/:course", labDeleteByCourse);

export default router;
