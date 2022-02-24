import GAME_ROUTES from "../constants/GameRoutes";



const GAME_ACTIONS = {
    GET_NEW_GAME: (game) => {
        return(dispatch) => {

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
                console.log(obj)
            })


        }
    }
};

export default GAME_ACTIONS;