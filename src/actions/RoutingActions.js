

const ROUTING_ACTIONS = {
    SET_NEXT_ROUTE: (next_route) => {
            return(dispatch) => {
                dispatch({type: "SET_NEXT_ROUTE", next_route: next_route})
            }
    },
    RESET_NEXT_ROUTE: () => {
        return(dispatch) => {
            dispatch({type: "DONE_REROUTING"})
        }
    }

}

export default ROUTING_ACTIONS;