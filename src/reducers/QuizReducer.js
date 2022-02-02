const default_state = {
    categories: [],
    quiz: [],
    SNAP: "huh what now?",
}

const QuizReducer = (state = default_state, action) => {

    switch(action.type){
        case "SET_CATEGORIES":
            return {...state, categories: action.payload}
        case "SET_QUIZ":
            return {...state, quiz: action.payload}
        default:
            return state;
    }

}

export default QuizReducer;