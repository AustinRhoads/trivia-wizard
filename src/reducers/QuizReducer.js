const default_state = {
    categories: [],
    all_counts: {},
    quiz: [],
    SNAP: "huh what now?",
}

const QuizReducer = (state = default_state, action) => {

    switch(action.type){
        case "SET_CATEGORIES":
            return {...state, categories: action.payload}
        case "SET_QUIZ":
            return {...state, quiz: action.payload}
        case "SET_COUNTS":
            console.log("inside reducer: ", action.location);
            return {...state, easyCount: action.payload.total_easy_question_count, mediumCount: action.payload.total_medium_question_count, hardCount: action.payload.total_hard_question_count, totalCount: action.payload.total_question_count,  all_counts: {...state.all_counts, [action.location]: action.payload}}
        default:
            return state;
    }

}

export default QuizReducer;