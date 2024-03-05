import * as MatriculateApi from '../api/MatriculateRequests';

export const getStartimeByCourse = (code: string) => async (dispatch: any) => {
  dispatch({ type: 'RETREIVING_START' });
  try {
    const { data } = await MatriculateApi.getStartimeByCourse(code);
    dispatch({ type: 'RETREIVING_SUCCESS', data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'RETREIVING_FAIL' });
  }
}