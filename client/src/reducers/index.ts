import { combineReducers } from "redux"

import authReducer from "./AuthReducer"
import courseReducer from "./CourseReducer"

export const reducers = combineReducers({ authReducer, courseReducer })
