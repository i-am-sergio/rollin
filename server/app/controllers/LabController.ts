import {
  saveLab,
  getAllLabs,
  getAllLabsByCourse,
  deleteLabByCourse,
  updateLabByCourse,
} from "../services/LabService";
import { Request, Response } from "express"

export const labCreate = async (req : Request, res : Response) => {
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

export const labFindAll = async (req : Request, res :Response) => {
  try {
    const data = await getAllLabs();
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json("Error interno del servidor");
  }
};

export const labFindByCourse = async (req : Request, res :Response) => {
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

export const labUpdateByCourse = async (req : Request, res :Response) => {
  try {
    const group = req.params.group;
    const course = req.params.course;
    const lab = req.body;
    if (!group || !course || !lab) {
      console.log("Content can not be empty!");
      res.status(400).json({ message: "Content can not be empty!" });
      return;
    }
    const data = await updateLabByCourse(group, course, lab);
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json("Error interno del servidor");
  }
};

export const labDeleteByCourse = async (req : Request, res : Response) => {
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
