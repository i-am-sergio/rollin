import * as LabApi from '../api/LabRequests'

export const getAllLabs = () => async (dispatch: any) => {
    dispatch({ type: "RETREIVING_START" });
    try {
        const { data } = await LabApi.getLabs();
        dispatch({ type: "RETREIVING_SUCCESS", data: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: "RETREIVING_FAIL" });
    }
}

export const createLab = (newLab: any) => async (dispatch: any) => {
    dispatch({ type: "CREATING_START" });
    console.log("DATA QUE SE ENVIA => ", newLab);
    try {
        const { data } = await LabApi.createLab(newLab);
        console.log("***CORRECT REQUEST");
        dispatch({ type: "CREATING_SUCCESS", data: data });
    } catch (error) {
        console.log(error);
        console.log("***FAIL REQUEST");
        dispatch({ type: "CREATING_FAIL" });
    }
}