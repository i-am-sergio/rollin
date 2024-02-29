import { combineReducers } from "redux"

import authReducer from "./AuthReducer"
import courseReducer from "./CourseReducer"
import labReducer from './LabReducer'

export const reducers = combineReducers({ authReducer, courseReducer, labReducer })
