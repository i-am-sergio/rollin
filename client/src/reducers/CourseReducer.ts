// Course Reducer
export interface CourseState {
  coursesData: any;
  loading: boolean;
  error: boolean;
  updateLoading: boolean;
}

export interface Action {
  type: string;
  data?: any;
}

const courseReducer = (
  state: CourseState = {
    coursesData: null,
    loading: false,
    error: false,
    updateLoading: false,
  },
  action: Action
): CourseState => {
  switch (action.type) {
    case "RETREIVING_START":
      return { ...state, loading: true, error: false };
    case "RETREIVING_SUCCESS":
      return {
        ...state,
        coursesData: action.data,
        loading: false,
        error: false,
      };
    case "RETREIVING_FAIL":
      return { ...state, loading: false, error: true };
    case "UPDATING_START":
      return { ...state, updateLoading: true, error: false };
    case "UPDATING_SUCCESS":
      return {
        ...state,
        coursesData: action.data,
        updateLoading: false,
        error: false,
      };
    case "UPDATING_FAIL":
      return { ...state, updateLoading: false, error: true };
    case "ADDING_START":
      return { ...state, updateLoading: true, error: false };
    case "ADDING_SUCCESS":
      return {
        ...state,
        coursesData: action.data,
        updateLoading: false,
        error: false,
      };
    case "ADDING_FAIL":
      return { ...state, updateLoading: false, error: true };
    case "DELETING_START":
      return { ...state, updateLoading: true, error: false };
    case "DELETING_SUCCESS":
      return {
        ...state,
        coursesData: action.data,
        updateLoading: false,
        error: false,
      };
    case "DELETING_FAIL":
      return { ...state, updateLoading: false, error: true };
    default:
      return state;
  }
};

export default courseReducer;
