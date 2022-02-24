const default_state = {
    rounds: 1,
    player: 2,
    questions_per_round: 10,
    join_code: '',
    current_round: 0,
}


const GameReducer = (state=default_state, action) => {
    switch(action.type){
        case "GET_GAME":
            return {...state};
        default:
            return state;
    }
}

export default GameReducer;