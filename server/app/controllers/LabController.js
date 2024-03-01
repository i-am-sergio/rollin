import {
  saveLab,
  getAllLabs,
  getAllLabsByCourse,
  deleteLabByCourse,
} from "../services/LabService.js";

export const labCreate = async (req, res) => {
  try {
    const lab = req.body;
    if (!req.body) {
      console.log("Content can not be empty!");
      res.status(400).json({ message: "Content can not be empty!" });
      return;
    }
    const data = await saveLab(lab);
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json("Error interno del servidor");
  }
};

export const labFindAll = async (req, res) => {
  try {
    const data = await getAllLabs();
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json("Error interno del servidor");
  }
};

export const labFindByCourse = async (req, res) => {
  try {
    const course = req.params.course;
    if (!course) {
      console.log("Content can not be empty!");
      res.status(400).json({ message: "Content can not be empty!" });
      return;
    }
    const data = await getAllLabsByCourse(course);
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json("Error interno del servidor");
  }
};

export const labDeleteByCourse = async (req, res) => {
  try {
    const group = req.params.group;
    const course = req.params.course;
    if (!group || !course) {
      console.log("Content can not be empty!");
      res.status(400).json({ message: "Content can not be empty!" });
      return;
    }
    const data = await deleteLabByCourse(group, course);
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json("Error interno del servidor");
  }
};
