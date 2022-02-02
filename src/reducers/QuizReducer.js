const default_state = {
    categories: [],
    SNAP: "huh what now?",
}

const QuizReducer = (state = default_state, action) => {

    switch(action.type){
        case "SET_CATEGORIES":
            return {...state, categories: action.payload}
        default:
            return state;
    }

}

export default QuizReducer;