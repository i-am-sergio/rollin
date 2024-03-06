import * as LabApi from "../api/LabRequests";

export const getLabByCourse = (course: any) => async (dispatch: any) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await LabApi.getLabByCourse(course);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const createLab = (newLab: any) => async (dispatch: any) => {
  dispatch({ type: "CREATING_START" });
  try {
    const { data } = await LabApi.createLab(newLab);
    dispatch({ type: "CREATING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "CREATING_FAIL" });
  }
};

export const updateLab =
  (course: any, group: any, updatedLab: any) => async (dispatch: any) => {
    dispatch({ type: "UPDATELAB_START" });
    try {
      const { data } = await LabApi.updateLab(course, group, updatedLab);
      dispatch({ type: "UPDATELAB_SUCCESS", data: data });
    } catch (error) {
      console.error(error);
      dispatch({ type: "UPDATELAB_FAIL" });
    }
  };

export const deleteLab = (course: any, group: any) => async (dispatch: any) => {
  dispatch({ type: "DELETING_START" });
  try {
    const { data } = await LabApi.deleteLab(course, group);
    dispatch({ type: "DELETING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "DELETING_FAIL" });
  }
};
