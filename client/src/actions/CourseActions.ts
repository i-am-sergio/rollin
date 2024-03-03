import * as CourseApi from '../api/CoursesRequests'

export const getAllCourses = () => async (dispatch: any) => {
    dispatch({ type: "RETREIVING_START" });
    try {
        const { data } = await CourseApi.getAllCourses();
        dispatch({ type: "RETREIVING_SUCCESS", data: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: "RETREIVING_FAIL" });
    }
}

export const updateCourse = (code: any, updatedCourse: any) => async (dispatch: any) => {
    try {
        const { data } = await CourseApi.updateCourse(code, updatedCourse);
        dispatch({ type: "UPDATE_SUCCESS", data: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: "UPDATE_FAIL" });
    }
}
