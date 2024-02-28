// save course in the database mongoose function
export const saveCourse = async (course) => {
  try {
    const newCourse = new CourseModel({
      name: course.name,
      code: course.code,
      labs: course.labs,
    });
    return await newCourse.save();
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

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
