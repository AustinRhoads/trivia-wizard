import SEARCH_ROUTES from '../constants/SearchRoutes';

const {BASE_URL, ADD_AMOUNT, ADD_CATEGORY, DIFFICULTY_PREFIX} = SEARCH_ROUTES;

const format_url = (request_object) => {

  const PREFIX = BASE_URL + ADD_AMOUNT + "10" + ADD_CATEGORY + request_object.category
  const DIFFICULTY = request_object.difficulty === "any" ? "": DIFFICULTY_PREFIX + request_object.difficulty

    return PREFIX + DIFFICULTY;
}


const QuizActions = {
    
    GET_CATEGORIES: () => {
        
        return(dispatch) => {
            fetch(SEARCH_ROUTES.CATEGORIES_URL).then(resp => resp.json()).then(obj => {
                console.log(obj)
                dispatch({type: "SET_CATEGORIES", payload: obj.trivia_categories})
            })
        }
    },

    GET_QUIZ: (request_object) => {
        let url = format_url(request_object)
      
        return(dispatch) => {
            fetch(url).then(resp => resp.json()).then(obj => {
                console.log(obj);
            })
        }
    }
}

export default QuizActions;