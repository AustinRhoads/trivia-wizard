const ACTION_ROUTES ={
    LOGIN_ROUTE: "http://localhost:3001/login",
    CREATE_USER_ROUTE: "http://localhost:3001/api/v1/users",
}

const set_user_in_cookie = ({user, logged_in}) => {
       
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("logged_in", logged_in)
  }


const USER_ACTIONS ={

    LOGIN:  (user, functions_object) => {
        return(dispatch) => {

            dispatch({type: "LOGGING_IN"});



            const configuration_object = {
           
                method: "POST",
    
                credentials: 'include',
    
                headers: {
                    'X-CSRF-TOKEN': unescape(document.cookie.split('CSRF-TOKEN=')[1]),
                    'content-type': 'application/json'
                },
    
                body: JSON.stringify(user)
    
            };



                fetch(ACTION_ROUTES.LOGIN_ROUTE, configuration_object)
                 .then(response => response.json())
                 .then(returned_user_object => {
                     if(returned_user_object.logged_in){
                        dispatch({type: "LOGIN", user: returned_user_object.user});
                        set_user_in_cookie({user: returned_user_object.user, logged_in: true})
                        functions_object.redirect_to_home()
                     } else {
                         dispatch({type: "ERROR", log_in_errors: returned_user_object.errors})
                       
                     }
                    
                     
                 })

               

        }
       
        
    },
    LOGOUT: ()  => {
        return(dispatch) => {
            dispatch({type: "LOGOUT"})
            set_user_in_cookie({user: {}, logged_in: false})
        }
        
    },
    
    CREATE_USER: (user, functions_object) => {
        return(dispatch) => {

            dispatch({type: "CREATING_USER"});



            const configuration_object = {
           
                method: "POST",
    
                credentials: 'include',
    
                headers: {
                    'X-CSRF-TOKEN': unescape(document.cookie.split('CSRF-TOKEN=')[1]),
                    'content-type': 'application/json'
                },
    
                body: JSON.stringify(user)
    
            };



                fetch(ACTION_ROUTES.CREATE_USER_ROUTE, configuration_object)
                 .then(response => response.json())
                 .then(returned_user_object => {
                     if(returned_user_object.created_success){
                        dispatch({type: "CREATED_USER", user: returned_user_object.user});
                        set_user_in_cookie({user: returned_user_object.user, logged_in: true})
                        functions_object.redirect_to_home()
                     } else {
                         dispatch({type: "ERROR", create_user_errors: returned_user_object.errors})
                       
                     }
                    
                     
                 })

               

        }
    }
}

export default USER_ACTIONS;