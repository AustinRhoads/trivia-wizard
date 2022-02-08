const default_state = {
    categories: JSON.parse(localStorage.getItem('categories')) || [],
    all_counts: {},
    all_counts_are_fetched: false,
    quiz: [],
    SNAP: "huh what now?",
}

const QuizReducer = (state = default_state, action) => {

    switch(action.type){
        case "SET_CATEGORIES":
            return {...state, categories: action.payload}
        case "SET_QUIZ":
            return {...state, quiz: action.payload}
        case "SET_FETCHED_COUNTS":         
            //return {...state, easyCount: action.payload.total_easy_question_count, mediumCount: action.payload.total_medium_question_count, hardCount: action.payload.total_hard_question_count, totalCount: action.payload.total_question_count,  all_counts: {...state.all_counts, [action.location]: action.payload}}
            return {...state,  all_counts: {...state.all_counts, [action.location]: action.payload}}
        case "SET_COUNTS_FROM_OBJECT":
            return {...state, easyCount: action.payload.total_easy_question_count, mediumCount: action.payload.total_medium_question_count, hardCount: action.payload.total_hard_question_count, totalCount: action.payload.total_question_count}
        case "ALL_COUNTS_ARE_FETCHED":
            return {...state, all_counts_are_fetched: true}
        default:
            return state;
    }

}

export default QuizReducer;