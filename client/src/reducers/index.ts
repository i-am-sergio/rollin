import { combineReducers } from "redux"

import authReducer from "./AuthReducer"
import courseReducer from "./CourseReducer"
import labReducer from './LabReducer'
import matriculateReducer from './MatriculateReducer'

export const reducers = combineReducers({ authReducer, courseReducer, labReducer, matriculateReducer })
