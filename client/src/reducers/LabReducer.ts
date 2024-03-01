// Lab Reducer
export interface LabState {
    labData: any;
    loading: boolean;
    error: boolean;
    updateLoading: boolean;
}

export interface Action {
    type: string;
    data?: any;
}

const labReducer = (
    state: LabState = {
        labData: null,
        loading: false,
        error: false,
        updateLoading: false,
    },
    action: Action
): LabState => {
    switch (action.type) {
        case "RETREIVING_START":
            return { ...state, loading: true, error: false };
        case "RETREIVING_SUCCESS":
            return { ...state, labData: action.data, loading: false, error: false };
        case "RETREIVING_FAIL":
            return { ...state, loading: false, error: true };
        case "UPDATING_START":
            return { ...state, updateLoading: true, error: false };
        case "UPDATING_SUCCESS":
            return {
                ...state,
                labData: action.data,
                updateLoading: false,
                error: false,
            };
        case "UPDATING_FAIL":
            return { ...state, updateLoading: false, error: true };
        case "CREATING_START":
            return { ...state, loading: true, error: false };
        case "CREATING_SUCCESS":
            return { ...state, labData: action.data, loading: false, error: false };
        case "CREATING_FAIL":
            return { ...state, loading: false, error: true };
        default:
            return state;
    }
}

export default labReducer;