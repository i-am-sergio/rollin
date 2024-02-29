import {
  getAllCourses,
  getAllCoursesWithLabs,
} from "../services/CourseService.js";
import CourseModel from "../models/CourseModel.js";

export const courseCreate = async (req, res) => {
  try {
    const { name, code } = req.body;
    if (!req.body) {
      console.log("Content can not be empty!");
      res.status(400).json({ message: "Content can not be empty!" });
      return;
    }
    const newCourse = CourseModel({ name, code });
    await newCourse.save();
    return res.status(200).json(newCourse);
  } catch (error) {
    res.status(500).json("Error interno del servidor");
  }
};

export const courseFindAll = async (req, res) => {
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

export const courseFindAllWithLabs = async (req, res) => {
  try {
    // get all courses with labs with course service
    const data = await getAllCoursesWithLabs();
    res.send(data);
  } catch (error) {
    res.status(500).json("Error interno del servidor");
  }
};
