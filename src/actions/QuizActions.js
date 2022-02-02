import SEARCH_ROUTES from '../constants/SearchRoutes';

const QuizActions = {
    
    GET_CATEGORIES: () => {
        
        return(dispatch) => {
            fetch(SEARCH_ROUTES.CATEGORIES_URL).then(resp => resp.json()).then(obj => {
                console.log(obj)
                dispatch({type: "SET_CATEGORIES", payload: obj.trivia_categories})
            })
        }
    },
}

export default QuizActions;