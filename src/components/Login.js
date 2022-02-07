import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import cuid from 'cuid'

export default function Login(props) {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const user = {username, password}

    const functions_object = {
        redirect_to_home: () => redirect_to_home()
    }

    const redirect_to_home = () => {
        navigate('/', {replace: true})
    }

    const login_and_redirect = (e) => {

        e.preventDefault()
        props.login_user(user, functions_object);
        
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
        </div>
    )
}


