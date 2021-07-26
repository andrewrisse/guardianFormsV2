import {combineReducers} from "@reduxjs/toolkit";
import surveyReducer from "./slices/survey";

const rootReducer = combineReducers({
    survey: surveyReducer,
});

export {rootReducer};
