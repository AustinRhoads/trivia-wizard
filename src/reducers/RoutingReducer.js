const default_routing_state = {
    next_route: "",
    need_to_reroute: false,
}


const RoutingReducer = (state = default_routing_state, action) => {
    switch(action.type){
        case "SET_NEXT_ROUTE":
            console.log("setting next route: ", action.next_route)
                return {...state, next_route: action.next_route, need_to_reroute: true}
        case "DONE_REROUTING":
                return {...state, next_route: "", need_to_reroute: false}
        default:
            return state;
    }

};

export default RoutingReducer;