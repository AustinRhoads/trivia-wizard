const initialUserState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    logged_in: (localStorage.getItem('logged_in') === "true" ? true:false) || false,
    loading: false,
    log_in_errors: []
}

const UserReducer = (state = initialUserState, action) => {

    switch(action.type){
        case "LOGGING_IN":
            return{...state, loading: true, log_in_errors: []}
        case "LOGIN":
            return {...state, logged_in: true, user: action.user,  loading: false, log_in_errors: []};
        case "LOGOUT":
            return {...state, user: {}, logged_in:false, log_in_errors: []}
        case "ERROR":
            return {...state, user: {}, logged_in: false,  loading: false, log_in_errors: action.log_in_errors}
        default:
            return state;
    }
}

export default UserReducer;