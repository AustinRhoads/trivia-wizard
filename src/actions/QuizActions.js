import SEARCH_ROUTES from '../constants/SearchRoutes';
import GAME_ACTIONS from './GameActions';







//TO GET THE QUESTIONS BASED ON DIFFICULTY LEVEL
//const {BASE_URL, ADD_AMOUNT, ADD_CATEGORY, DIFFICULTY_PREFIX, COUNT_URL_BASE} = SEARCH_ROUTES;
const {BASE_URL, ADD_AMOUNT, ADD_CATEGORY, COUNT_URL_BASE, RETRIEVE_TOKEN_URL, ADD_TOKEN} = SEARCH_ROUTES;



const format_url = (request_object, count) => {

    

  const PREFIX = BASE_URL + ADD_AMOUNT + `${count}` + ADD_CATEGORY + request_object.category 
 
   // FORMATTING URL TO GET DIFFICULTY
   // const DIFFICULTY = request_object.difficulty === "any" ? "": DIFFICULTY_PREFIX + request_object.difficulty
   // return PREFIX + DIFFICULTY;

    return PREFIX + ADD_TOKEN + request_object.quiz_token;
}

const format_count_request_url = (request_object) => {
     return COUNT_URL_BASE + request_object.category
}

const set_categories_in_cookie = ({categories}) => {
       
    localStorage.setItem("categories", JSON.stringify(categories))
   
  }


const QUIZ_ACTIONS = {
    
    GET_CATEGORIES: () => {
        
        return(dispatch) => {
            fetch(SEARCH_ROUTES.CATEGORIES_URL).then(resp => resp.json()).then(obj => {
                set_categories_in_cookie({categories: obj.trivia_categories})
                dispatch({type: "SET_CATEGORIES", payload: obj.trivia_categories})
            })
        }
    },

    GET_QUIZ: (request_object, count = 10) => {


        let url = format_url(request_object, count)
      
        return async (dispatch) => {
            console.log("stuff is happening", url);

           

            fetch(url).then(resp => resp.json()).then(obj => {

                //TODAYS (SOON TO BE YESTERDAYS) QUIZ CODE: '621e3e52f9c3a9834b4086bd03abd18a20f9ae7ec1094bccd851080c62905b26'
                if(obj.response_code === 3 || obj.response_code === 4){
                  dispatch(QUIZ_ACTIONS.GET_NEW_TOKEN_AND_GET_QUIZ(request_object, count))
                 

                   
                 
                } else{
                    dispatch({type: "SET_QUIZ", payload: obj.results});
                }    
         
            })
        }
    },

    GET_QUIZ_BASED_ON_CATEGORY_COUNT: (request_object) => {
        let count_url = format_count_request_url(request_object);
         fetch(count_url).then(resp => resp.json()).then(obj => {
           let count = QUIZ_ACTIONS.GET_COUNT_BASED_ON_DIFFICULTY(request_object, obj)
          
           if(count > 0){
            console.log( count, " is greater than zero");
            QUIZ_ACTIONS.GET_QUIZ(request_object, count)
           }

        })
    },

    GET_COUNT_BASED_ON_DIFFICULTY: (request_object, obj) => {


        const { category_question_count } = obj;
        const { total_easy_question_count, total_medium_question_count, total_hard_question_count, total_question_count} = category_question_count

        switch(request_object.difficulty){
            case "easy":
                return total_easy_question_count;
            case "medium":
                return total_medium_question_count;
            case "hard":
                return total_hard_question_count;
            default:
                return total_question_count;
        }
    },

    GET_CATEGORY_QUESTION_COUNTS: (request_object) => {

        let count_url = format_count_request_url(request_object);


        return(dispatch) => {
            
            fetch(count_url).then(resp => resp.json()).then(obj => {
                    
                    dispatch({type: "SET_FETCHED_COUNTS", location: `category_${obj.category_id}_question_count`, payload: obj.category_question_count})
                
                }
            )
        }

    },
    SET_COUNTS_FROM_OBJECT: (obj) => {
        return(dispatch) => {
            dispatch({type: "SET_COUNTS_FROM_OBJECT", payload: obj})
        }
       
    },
    GET_ALL_COUNTS: (array) => {

        return async (dispatch) => {
            for(const category_obj of array) {
               await dispatch(QUIZ_ACTIONS.GET_CATEGORY_QUESTION_COUNTS(category_obj))
            }
           // dispatch({type: "ALL_COUNTS_ARE_FETCHED"})
        }
    },

    GET_NEW_TOKEN_AND_GET_QUIZ: (request_object, count) => {
        return (dispatch) => {
            fetch(RETRIEVE_TOKEN_URL).then(resp => resp.json()).then(obj => {
                console.log("setting it!!!!")
                localStorage.setItem("quiz_token", obj.token)
                dispatch({type: 'SET_QUIZ_TOKEN', quiz_token: obj.token})
                dispatch(QUIZ_ACTIONS.GET_QUIZ({...request_object, quiz_token: obj.token}, count))
            })
            
            
        }
       
    },

    GET_NEW_TOKEN: () => {
        return (dispatch) => {
            fetch(RETRIEVE_TOKEN_URL).then(resp => resp.json()).then(obj => {
                console.log("setting it!!!!")
                localStorage.setItem("quiz_token", obj.token)
                dispatch({type: 'SET_QUIZ_TOKEN', quiz_token: obj.token})
            })
            
            
        }
       
    },


    ///IT ALL STARTS HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    GET_QUIZ_ROUND: async (game, dispatch) => {
        
        let url = format_url(game, game.questions_per_round)
        var quiz

        await fetch(url).then(resp => resp.json()).then(obj => {
            console.log("HERE I AM: ", obj)
            //qr = obj.results;
            if(obj.response_code === 3 || obj.response_code === 4){
                quiz = (dispatch) => (QUIZ_ACTIONS.GET_NEW_TOKEN_AND_ROUND(game));
              } else{                 
                quiz = obj.results;
                console.log("inside quiz actions", quiz)
              } 
        })
        return quiz;
        
    },

    GET_NEW_TOKEN_AND_ROUND: (game, quiz_request_object) => {
        return (dispatch) => {
            fetch(RETRIEVE_TOKEN_URL).then(resp => resp.json()).then(obj => {
                console.log("setting it!!!!")
                localStorage.setItem("quiz_token", obj.token)
                dispatch({type: 'SET_QUIZ_TOKEN', quiz_token: obj.token})
               quiz_request_object.quiz_token = obj.token
               dispatch(QUIZ_ACTIONS.GET_ROUND(game, quiz_request_object))
            })
            
            
        }
       
    },

    GET_ROUND: (game, {round_number, category, quiz_token}) => {

        let current_token = localStorage.getItem("quiz_token") 
        let url = format_url({category,  quiz_token: current_token}, game.questions_per_round);
    
        return(dispatch) => {
            fetch(url).then(resp => resp.json()).then(obj => {
               
            
                if(obj.response_code === 3 || obj.response_code === 4){
                   dispatch(QUIZ_ACTIONS.GET_NEW_TOKEN_AND_ROUND(game, {round_number, category, quiz_token}))
                  } else{                 
                    dispatch(GAME_ACTIONS.ADD_ROUND_TO_GAME({quiz: obj.results, round_number: round_number, game_id: game.id}))
                   
                  } 
            })
        }


      
    },


}

export default QUIZ_ACTIONS;