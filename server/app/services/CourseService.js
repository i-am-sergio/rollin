// save course in the database mongoose function
import CourseModel from "../models/CourseModel.js";

// get all courses from the database mongoose function
export const getAllCourses = async () => {
  try {
    return await CourseModel.find();
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

// get all courses with labs from the database mongoose function
export const getAllCoursesWithLabs = async () => {
  try {
    return await CourseModel.find().populate("labs");
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};
