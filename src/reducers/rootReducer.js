import { combineReducers } from "redux";

import QuizReducer from "./QuizReducer";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({
    quiz_state: QuizReducer,
    user_state: UserReducer,
});

export default rootReducer;