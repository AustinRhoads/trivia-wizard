

const ROUTING_ACTIONS = {
    SET_NEXT_ROUTE: (next_route) => {
            return(dispatch) => {
                dispatch({type: "SET_NEXT_ROUTE", next_route: next_route})
            }
    }

}

export default ROUTING_ACTIONS;