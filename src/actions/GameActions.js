import GAME_ROUTES from "../constants/GameRoutes";
import QUIZ_ACTIONS from "./QuizActions";




const GAME_ACTIONS = {
    GET_NEW_GAME: (game) => {
        
        return async (dispatch) => {

             let rounds = await GAME_ACTIONS.GET_ALL_QUIZ_ROUNDS(game, dispatch);
             game.quiz_rounds = rounds;
             

            const configuration_object = {
           
                method: "POST",
    
                credentials: 'include',
    
                headers: {
                    'X-CSRF-TOKEN': unescape(document.cookie.split('CSRF-TOKEN=')[1]),
                    'content-type': 'application/json'
                },
    
                body: JSON.stringify(game)
    
            };



            fetch(GAME_ROUTES.NEW_GAME_ROUTE, configuration_object).then(resp => resp.json()).then(obj => {
                
                dispatch({type: "SET_GAME", game: obj})
            })


        }
    },

    GET_ALL_QUIZ_ROUNDS: async (game, dispatch) => {
        var quiz_rounds = [];

        

         for(let x = 0; x < game.numberOfRounds; x++) {
            let new_quiz =  await QUIZ_ACTIONS.GET_QUIZ_ROUND(game, dispatch)
            
            let new_round = {quiz: new_quiz, round_number: x}
            
            quiz_rounds.push(new_round)
           
        }

        return quiz_rounds
    }
};

export default GAME_ACTIONS;