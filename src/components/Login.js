import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import cuid from 'cuid'

export default function Login(props) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const next_route = useSelector(state => state.routing_state.next_route);
    const need_to_reroute = useSelector(state => state.routing_state.need_to_reroute);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("")    
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("")

    const user = {username, password}
    const new_user = {username: newUsername, password: newPassword, password_confirmation: newPasswordConfirmation };

    const functions_object = {
        redirect_to_home: () => redirect_to_home(),
        need_to_reroute: need_to_reroute,
        next_route: next_route,
        redirect_to: (next_route) => {
            redirect_to(next_route)
        },
    }

    const redirect_to_home = () => {
        navigate('/', {replace: true})
    }

    const redirect_to = (next_route) => {
        navigate(next_route, {replace: true})
    }

    const login_and_redirect = (e) => {

        e.preventDefault()
        if(username !== "" && password !== ""){
            props.login_user(user, functions_object);
        }
       
        
    }

    function updateUsername(e) {
        setUsername(currentUsername => currentUsername = e.target.value)
    }


    function updatePassword(e){
        setPassword(currentPassword => currentPassword = e.target.value)
    }

    const render_login_errors = () => {
        if(props.log_in_errors){
            return props.log_in_errors.map(error => {return <h3 key={cuid} style={{color: "red"}}>{error}</h3>}) 
        }
    }

    const updateNewUsername = (e) => {
        setNewUsername(new_name => new_name = e.target.value);
    }

    const updateNewPassword = (e) => {
        setNewPassword(currentNewPassword => currentNewPassword = e.target.value);
    }    
    const updateNewPasswordConfirmation = (e) => {
        setNewPasswordConfirmation(currentNewPasswordConfirmation => currentNewPasswordConfirmation = e.target.value);
    }


    const signup_and_redirect = (e) => {
        e.preventDefault()
        props.create_user(new_user, functions_object);
    } 

    const swap_form_type = (e) => {
       let login = document.getElementById("login-div");
       let signup = document.getElementById("signup-div");
       let elements = [login, signup]

        for (const element of elements){
            if(element.classList.contains("slide-up")){
                element.classList.remove("slide-up");
                element.classList.add("slide-down");
            } else {
                element.classList.remove("slide-down")
                element.classList.add("slide-up");
            }
        }

       //for(const element of elements){
       //    console.log("here", element)
       //}
        
        
    }


    useEffect(() => {
        console.log("in login: ", next_route, need_to_reroute )
    }, [])

    return (
        <div id="login-componenet" >

                <div className="form-swap rotate-sqaure"><a href="#signup-div" className="unrotate-text">or create a new user</a></div>
                <div className="form-swap rotate-sqaure"><a href="#login-div" className="unrotate-text out">Login</a></div>

            <div id="login-signup-div" >
                <div id="login-div" className="slideable form-box">
                    <h1>Login</h1>

                    {render_login_errors()}

                    <form onSubmit={(e) => login_and_redirect(e)} >
                        <input type="text" placeholder="username" onChange={(e) => updateUsername(e)} value={username}/>
                        <div className="spacer" ></div>
                        <input type="password" placeholder="password" onChange={(e) => updatePassword(e)} value={password}/>
                        <div className="spacer" ></div>
                        <input className="btns" type="submit"value="login" />
                    </form>
                  
                </div>

                <br/>
                

                
                <div className="spacer" ></div>

                <div id="signup-div" className="slideable form-box">
                    <form onSubmit={(e) => signup_and_redirect(e)}>
                        <input type="text" placeholder="username" onChange={(e) => updateNewUsername(e)} value={newUsername}/>
                        <div className="spacer" ></div>
                        <input type="password" placeholder="password" onChange={(e) => updateNewPassword(e)} value={newPassword}/>
                        <div className="spacer" ></div>
                        <input type="password" placeholder="password confirmation" onChange={(e) => updateNewPasswordConfirmation(e)} value={newPasswordConfirmation}/>
                        <div className="spacer"></div>
                        <input className="btns-inverted" type="submit"value="Sign Up" />
                    </form>
                </div>
            </div>
        </div>
    )
}


