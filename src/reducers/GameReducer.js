const default_state = {
    game: {},
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
        case "SET_GAME":
            console.log("setting game")
            
            return {...state, game: action.game};

        default:
            return state;
    }
}

export default GameReducer;