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
  dispatch({ type: 'RETREIVING_START' });
  try {
    const { data } = await MatriculateApi.getLabsByCourse(code);
    dispatch({ type: 'RETREIVING_SUCCESS', data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'RETREIVING_FAIL' });
  }

}

// To matriculate a user to a lab (to do) 
// export const matriculateRequest = (code: string) => async (dispatch: any) => {