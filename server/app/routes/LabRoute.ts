import express from "express";
import {
  labCreate,
  labFindAll,
  labFindByCourse,
  labDeleteByCourse,
  labUpdateByCourse,
} from "../controllers/LabController";

const router = express.Router();

router.post("/", labCreate);
router.get("/", labFindAll);
router.get("/:course", labFindByCourse);
router.put("/:group/:course", labUpdateByCourse);
router.delete("/:group/:course", labDeleteByCourse);

export default router;
