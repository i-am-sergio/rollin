import * as MatriculateApi from '../api/MatriculateRequests';

export const getCourseByCode = (code: string) => async (dispatch: any) => {
  dispatch({ type: 'RETREIVING_START' });
  try {
    const { data } = await MatriculateApi.getCourseByCode(code);
    dispatch({ type: 'RETREIVING_SUCCESS', data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'RETREIVING_FAIL' });
  }
}

export const getLabsByCourse = (code: string) => async (dispatch: any) => {
  dispatch({ type: 'GET_LABS_START' });
  try {
    const { data } = await MatriculateApi.getLabsByCourse(code);
    console.log("DATA => ", data);
    dispatch({ type: 'GET_LABS_SUCCESS', data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'GET_LABS_FAIL' });
  }

}

// To matriculate a user to a lab (to do) 
export const matriculateInLab = (cui: string, course: string, group: string) => async (dispatch: any) => {
  dispatch({ type: 'MATRICULATE_START' });
  try {
    const { data } = await MatriculateApi.matriculateInLab(cui, course, group);
    dispatch({ type: 'MATRICULATE_SUCCESS', data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'MATRICULATE_FAIL' });
  }
}