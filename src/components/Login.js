import React, {useState, useEffect} from 'react'

import cuid from 'cuid'

export default function Login(props) {

   

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


    const scroll_to = (e, destination) => {

        let signup_swapper = document.getElementById("signup-swapper");
        let login_swapper = document.getElementById("login-swapper");
        let swappers = [signup_swapper, login_swapper]

        for(const swap_btn of swappers){
            swap_btn.classList.toggle("out")
            swap_btn.classList.toggle("in")
            swap_btn.classList.toggle("right-swapper")
            swap_btn.classList.toggle("left-swapper")
        }
        
        let win = document.getElementById("login-signup-div");
        let x_position_of_destination_element = document.getElementById(destination).getBoundingClientRect().left;
        if(Math.floor(x_position_of_destination_element) !== 169){
          
            win.scrollTo(x_position_of_destination_element, 0)
        }   
    }


    useEffect(() => {
      
    }, [])

    return (
        <div id="login-componenet" >

                
                <div id="signup-swapper" className="form-swap rotate-sqaure in right-swapper" onClick={(e) => scroll_to(e,"signup-div")}><span className="unrotate-text">or create a new user</span></div>
                
                <div id="login-swapper" className="form-swap rotate-sqaure out right-swapper" onClick={(e) => scroll_to(e, "login-div")}><span  className="unrotate-text">Login</span></div>

            <div id="login-signup-div" >
                <div id="login-div" className="form-box">
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

                <div id="signup-div" className="form-box">
                    <h1>SIGN UP</h1>
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


