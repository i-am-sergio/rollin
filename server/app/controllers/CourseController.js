import {
  saveCourse,
  getAllCourses,
  getAllCoursesWithLabs,
} from "../services/CourseService.js";

export const courseCreate = async (req, res) => {
  try {
    const course = req.body;
    // validate request
    if (!req.body) {
      console.log("Content can not be empty!");
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    const data = await saveCourse(course);
    res.send(data);
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
};

export const courseFindAll = async (req, res) => {
  try {
    // get all courses with course service
    const data = await getAllCourses();
    res.send(data);
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
};

export const courseFindAllWithLabs = async (req, res) => {
  try {
    // get all courses with labs with course service
    const data = await getAllCoursesWithLabs();
    res.send(data);
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
};
