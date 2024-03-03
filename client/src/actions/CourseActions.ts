import * as CourseApi from "../api/CoursesRequests";

export const getAllCourses = () => async (dispatch: any) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await CourseApi.getAllCourses();
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const addLabToCourse = (data: any) => async (dispatch: any) => {
  dispatch({ type: "ADDING_START" });
  try {
    const response = await CourseApi.addLabToCourse(data);
    dispatch({ type: "ADDING_SUCCESS", data: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ADDING_FAIL" });
  }
};

export const deleteLabFromCourse = (data: any) => async (dispatch: any) => {
  dispatch({ type: "DELETING_START" });
  try {
    const response = await CourseApi.deleteLabFromCourse(data);
    dispatch({ type: "DELETING_SUCCESS", data: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "DELETING_FAIL" });
  }
};
