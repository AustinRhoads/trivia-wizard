import React from 'react';
import { useNavigate } from 'react-router-dom';
//import {useSelector} from 'react-redux';

import Wizard from "../images/kisspng-king-arthur-magician-dungeons-dragons-fantasy-my-merlin-5b478c21b2e550.6693665515314155857328.png"

export default function Home(props) {
    
    const navigate = useNavigate()

const { logged_in } = props;

const redirect_to_login = () => {
    navigate('/login', {replace: false})
}

const redirect_to_game = () => {
    navigate('/game', {replace: false})
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
      <img id="wizard-img" alt="wizard" src={Wizard} />
      {render_new_game_button()}

  </div>;
}
