import GAME_ROUTES from "../constants/GameRoutes";
import QUIZ_ACTIONS from "./QuizActions";

const {NEW_GAME_ROUTE, QUIZZES_ROUTE, JOIN_ROUTE} = GAME_ROUTES;




const GAME_ACTIONS = {
    GET_NEW_GAME: (game) => {
        
        return async (dispatch) => {

            dispatch({type: "LOADING_GAME"})

             //let rounds = await GAME_ACTIONS.GET_ALL_QUIZ_ROUNDS(game, dispatch);
             //console.log("How we doin: ", rounds)
             //game.quiz_rounds = rounds;

           // function sendQuizToRound (success){
           //     console.log("success: ", success)
           //     //dispatch({})
           // }

           // function quizError(succes){
           //     dispatch({})
           // }

            //for (let x = 0; x < game.number_of_rounds; x++) {
            //
            //     await dispatch(QUIZ_ACTIONS.ADD_ROUND(game, x) )
            //   // sendQuizToRound(success)
            // }
            //// await GAME_ACTIONS.GET_ALL_QUIZ_ROUNDS(game, dispatch);
            // console.log("afterwards")

           

            const configuration_object = {
           
                method: "POST",
    
                credentials: 'include',
    
                headers: {
                    'X-CSRF-TOKEN': unescape(document.cookie.split('CSRF-TOKEN=')[1]),
                    'content-type': 'application/json'
                },
    
                body: JSON.stringify(game)
    
            };



            fetch(NEW_GAME_ROUTE, configuration_object).then(resp => resp.json()).then(obj => {
                
                dispatch({type: "SET_GAME", game: obj.game, status: obj.status})
               // GAME_ACTIONS.GET_ALL_QUIZ_ROUNDS(obj.game, game.rounds, dispatch);
               console.log("this is what rounds looks like: ", game.rounds)
                dispatch(GAME_ACTIONS.GET_ALL_QUIZ_ROUNDS(obj.game, game.rounds));
            })


        }
    },

//    GET_ALL_QUIZ_ROUNDS: (game, rounds, dispatch) => {
//       
//      
//
//        for (const round of rounds) { 
//           dispatch(QUIZ_ACTIONS.GET_ROUND(game, round) )
//        }
//       
//        return true;
//
//    },

GET_ALL_QUIZ_ROUNDS: (game, rounds) => {
       
      return(dispatch) => {
        for (const round of rounds) { 
            dispatch(QUIZ_ACTIONS.GET_ROUND(game, round) )
         }
        
      }
    
 
           // return true;
    
        },

    
    ADD_ROUND_TO_GAME: (round) =>{
      
        
            round.quiz.map(q => {
                let temp = q.type;
                q.question_type = temp;
                delete q.type;
            })

            console.log(round.quiz)
        const configuration_object = {
           
            method: "POST",

            credentials: 'include',

            headers: {
                'X-CSRF-TOKEN': unescape(document.cookie.split('CSRF-TOKEN=')[1]),
                'content-type': 'application/json'
            },

            body: JSON.stringify(round)

        };

        return(dispatch) => {
            fetch(QUIZZES_ROUTE, configuration_object).then(resp => resp.json()).then(obj => {
                if(obj.recieved_all_quizzes){
                    dispatch({type: "GAME_IS_LOADED"})
                }
            })
        }
    },

    GET_GAME_FROM_JOIN_CODE: (code) => {

        return(dispatch) => {
            fetch(JOIN_ROUTE + `/${code}`,).then(resp => resp.json()).then(obj => {
                return obj;
        })
        }


    }
};

export default GAME_ACTIONS;