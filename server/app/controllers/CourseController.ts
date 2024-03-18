import {
  getAllCourses,
  getAllCoursesWithLabs,
  addLabToCourse,
  deleteLabFromCourse,
  updateCourse,
} from "../services/CourseService";
import CourseModel from "../models/CourseModel";
import { Request, Response } from "express";

export const courseCreate = async (req : Request, res : Response) => {
  try {
    const { name, code, semestre } = req.body;
    if (!req.body) {
      console.log("Content can not be empty!");
      res.status(400).json({ message: "Content can not be empty!" });
      return;
    }
    const newCourse = new CourseModel({ name, code, semestre });
    await newCourse.save();
    return res.status(200).json(newCourse);
  } catch (error) {
    res.status(500).json("Error interno del servidor");
  }
};

export const courseFindAll = async (req : Request, res : Response) => {
  try {
    const data = await getAllCourses();
    return res.status(200).json(
      data.sort((a, b) => {
        return a.code.localeCompare(b.code);
      })
    );
  } catch (error) {
    res.status(500).json("Error interno del servidor");
  }
};

export const courseFindAllWithLabs = async (req : Request, res : Response) => {
  try {
    // get all courses with labs with course service
    const data = await getAllCoursesWithLabs();
    res.send(data);
  } catch (error) {
    res.status(500).json("Error interno del servidor");
  }
};

export const courseAddLab = async (req : Request, res : Response) => {
  try {
    const { course, lab } = req.body;
    console.log(course, lab);
    const data = await addLabToCourse(course, lab);
    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).json("Error interno del servidor");
  }
};

export const courseDeleteLab = async (req : Request, res : Response) => {
  try {
    const { course, lab } = req.body;
    console.log(course, lab);
    const data = await deleteLabFromCourse(course, lab);
    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).json("Error interno del servidor");
  }
};

// course update function save new startime
export const courseUpdate = async (req : Request, res : Response) => {
  try {
    const { code } = req.params;
    const { startime } = req.body;
    console.log(code, startime);
    const data = await updateCourse(code, startime);
    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).json("Error interno del servidor");
  }
};
