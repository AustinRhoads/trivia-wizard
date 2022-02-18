import React, {useState, useEffect} from 'react'
//import {useSelector, useDispatch} from 'react-redux'
//import { useNavigate } from 'react-router-dom'
import cuid from 'cuid'

export default function Login(props) {

    //const navigate = useNavigate()
    //const dispatch = useDispatch()

    const {functions_object} = props;
    


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("")    
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("")

    const user = {username, password}
    const new_user = {username: newUsername, password: newPassword, password_confirmation: newPasswordConfirmation };


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

   // const swap_form_type = (e) => {
   //    let login = document.getElementById("login-div");
   //    let signup = document.getElementById("signup-div");
   //    let elements = [login, signup]
//
   //     for (const element of elements){
   //         if(element.classList.contains("slide-up")){
   //             element.classList.remove("slide-up");
   //             element.classList.add("slide-down");
   //         } else {
   //             element.classList.remove("slide-down")
   //             element.classList.add("slide-up");
   //         }
   //     }
//
//
   //     
   //     
   // }


    useEffect(() => {
      
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


