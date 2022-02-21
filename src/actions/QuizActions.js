import SEARCH_ROUTES from '../constants/SearchRoutes';

//TO GET THE QUESTIONS BASED ON DIFFICULTY LEVEL
//const {BASE_URL, ADD_AMOUNT, ADD_CATEGORY, DIFFICULTY_PREFIX, COUNT_URL_BASE} = SEARCH_ROUTES;
const {BASE_URL, ADD_AMOUNT, ADD_CATEGORY, COUNT_URL_BASE, RETRIEVE_TOKEN_URL, ADD_TOKEN} = SEARCH_ROUTES;


const format_url = (request_object, count) => {


  const PREFIX = BASE_URL + ADD_AMOUNT + `${count}` + ADD_CATEGORY + request_object.category 
 
   // FORMATTING URL TO GET DIFFICULTY
   // const DIFFICULTY = request_object.difficulty === "any" ? "": DIFFICULTY_PREFIX + request_object.difficulty
   // return PREFIX + DIFFICULTY;

    return PREFIX + ADD_TOKEN + request_object.quiz_token;;
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
      
        return(dispatch) => {
            console.log("stuff is happening", url);
            fetch(url).then(resp => resp.json()).then(obj => {

                if(obj.response_code === 3 || obj.response_code === 4){
                    dispatch(QUIZ_ACTIONS.GET_NEW_TOKEN())
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

    GET_NEW_TOKEN: () => {
        return (dispatch) => {
            fetch(RETRIEVE_TOKEN_URL).then(resp => resp.json()).then(obj => {
                localStorage.setItem("quiz_token", obj.token)
                dispatch({type: 'SET_QUIZ_TOKEN', quiz_token: obj.token})
            })
        }
    },

}

export default QUIZ_ACTIONS;