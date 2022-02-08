import React from 'react';
import { useNavigate } from 'react-router-dom';
//import {useSelector} from 'react-redux';

export default function Home(props) {
    
    const navigate = useNavigate()

const { logged_in } = props;

const redirect_to_login = () => {
    navigate('/login', {replace: true})
}

const redirect_to_game = () => {
    navigate('/game', {replace: true})
}

const new_game_button = () => {
    return <button onClick={() => redirect_to_game()}>New Game</button>
}



const render_new_game_button = () => {
    if(logged_in){
        return <div>
            <h2>Logged in</h2>
            {new_game_button()}
            <button onClick={() => props.logout_user()}>Log out</button>
        </div>

    } else{
        return <div>
            <div>{new_game_button()} as guest</div>
            <br/>
            or
            <br/>
            <button onClick={() => redirect_to_login()}>Log in</button>
        </div>

    }
}




  return <div id="home">
      <h1>Home</h1>
      {render_new_game_button()}

  </div>;
}
