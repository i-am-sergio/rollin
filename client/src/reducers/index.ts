import { combineReducers, Reducer } from "redux";
import authReducer, { AuthState } from "./AuthReducer";

export interface RootState {
  auth: AuthState;
}

export const reducers: Reducer<RootState> = combineReducers({
  auth: authReducer,
});
