import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import cuid from 'cuid'

export default function Login(props) {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("")    
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("")

    const user = {username, password}
    const new_user = {username: newUsername, password: newPassword, password_confirmation: newPasswordConfirmation };

    const functions_object = {
        redirect_to_home: () => redirect_to_home()
    }

    const redirect_to_home = () => {
        navigate('/', {replace: true})
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


    useEffect(() => {
        console.log("login use effect")
    }, [])

    return (
        <div>
            <h1>Login</h1>

            {render_login_errors()}
            
            <form onSubmit={(e) => login_and_redirect(e)}>
                <input type="text" placeholder="username" onChange={(e) => updateUsername(e)} value={username}/>
                <input type="password" placeholder="password" onChange={(e) => updatePassword(e)} value={password}/>
                <input type="submit"value="login" />
            </form>

            <br/>

            <form onSubmit={(e) => signup_and_redirect(e)}>
                <input type="text" placeholder="username" onChange={(e) => updateNewUsername(e)} value={newUsername}/>
                <input type="password" placeholder="password" onChange={(e) => updateNewPassword(e)} value={newPassword}/>
                <input type="password" placeholder="password" onChange={(e) => updateNewPasswordConfirmation(e)} value={newPasswordConfirmation}/>
                <input type="submit"value="Sign Up" />
            </form>
        </div>
    )
}


