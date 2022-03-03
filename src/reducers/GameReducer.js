const default_state = {
    game: {},
    number_of_rounds: 1,
    player: 2,
    questions_per_round: 10,
    join_code: '',
    current_round: 0,
    loading_game: false,
    rounds: [],
    all_rounds_recieved: false,
    
}


const GameReducer = (state=default_state, action) => {
    switch(action.type){
        case "GET_GAME":
            return {...state};
        case "LOADING_GAME":
            return {...state, loading_game: true};
        case "SET_GAME":
            console.log("setting game")
            console.log(action.game)
            return {...state, game: action.game};
        case "ADD_ROUND_TO_GAME":

           state.rounds.push(action.round)
            return {...state}
        case "GAME_IS_LOADED":
            return {...state, loading_game: false}
        default:
            return state;
    }
}

export default GameReducer;