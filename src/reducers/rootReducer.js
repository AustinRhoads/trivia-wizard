import { combineReducers } from "redux";

import QuizReducer from "./QuizReducer";

const rootReducer = combineReducers({
    quiz_state: QuizReducer,
});

export default rootReducer;