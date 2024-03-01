import express from "express";
import {
  labCreate,
  labFindAll,
  labFindByCourse,
} from "../controllers/LabController.js";

const router = express.Router();

router.post("/", labCreate);
router.get("/", labFindAll);
router.get("/:course", labFindByCourse);

export default router;
