import { combineReducers } from "redux";


import QuizReducer from "./QuizReducer";
import RoutingReducer from "./RoutingReducer";
import UserReducer from "./UserReducer";
import GameReducer from "./GameReducer";

const rootReducer = combineReducers({
    quiz_state: QuizReducer,
    user_state: UserReducer,
    routing_state: RoutingReducer,
    game_state: GameReducer,
});

export default rootReducer;