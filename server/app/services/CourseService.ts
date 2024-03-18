import CourseModel from "../models/CourseModel";

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

export const addLabToCourse = async (course : any, lab : any) => {
  try {
    const courseFound = await CourseModel.findOne({ code: course });
    if (!courseFound) {
      throw new Error("El curso no existe");
    }
    courseFound.labs.push(lab);
    return await courseFound.save();
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const deleteLabFromCourse = async (course : any, lab : any) => {
  try {
    const courseFound = await CourseModel.findOne({ code: course });
    if (!courseFound) {
      throw new Error("El curso no existe");
    }
    courseFound.labs = courseFound.labs.filter((labId) => labId !== lab);
    return await courseFound.save();
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const updateCourse = async (code : any, startime : any) => {
  try {
    const courseFound = await CourseModel.findOne({ code: code });
    if (!courseFound) {
      throw new Error("El curso no existe");
    }
    courseFound.startime = startime;
    return await courseFound.save();
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};
