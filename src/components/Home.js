import React from 'react';
import { useNavigate } from 'react-router-dom';
//import {useSelector} from 'react-redux';

//import Wizard from "../images/kisspng-king-arthur-magician-dungeons-dragons-fantasy-my-merlin-5b478c21b2e550.6693665515314155857328.png"
import Dynamic_img from "../images/kisspng-computer-icons-encapsulated-postscript-handheld-de-laptop-phone-icon-5b49db86a430a0.3590097415315669826725.png"
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
    return <button className="btns" onClick={() => redirect_to_game()}>New Game</button>
}



const render_new_game_button = () => {
    if(logged_in){
        return <div>
            {new_game_button()}
            
        </div>

    } else{
        return <div>
            <div>{new_game_button()} as guest or  <button className="btns-inverted" onClick={() => redirect_to_login()}>Log in</button></div>

           
        </div>

    }
}




  return <div id="home">
      
      {/*<img id="wizard-img" alt="wizard" src={Wizard} />*/}
      <div id="homepage-row-one">
          <div className="homepage-row-one-box">
              <div className="header-one" >Lorem ipsum dolor sit amet</div>
              <div id="homepage-row-one-text" className="text-one">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>

          {render_new_game_button()}

          </div>

          <div className="homepage-row-one-box">
              <img id="dynamic-img" alt="stuff" src={Dynamic_img} />

          </div>

      </div>

      <h3 className="animated-h3"><span>This </span>WILL <span><span>BE </span><span>Animated</span></span></h3>

      <div id="homepage-how-to">
          <h1 clasName="header-one">HOW TO PLAY</h1>

        <div id="homepage-how-to-steps">

            <div  className="step" id="step-one">
                
                <div className="step-image"></div>
                <div className="step-header">Get your Stuff</div>
                <div className="step-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
              
            </div>

            <div className="step"  id="step-two">
                
                <div className="step-image"></div>
                <div className="step-header">Choose your stuff</div>
                <div className="step-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </div>

            <div className="step"  id="step-three">
                
                <div className="step-image"></div>
                <div className="step-header">Start your stuff</div>
                <div className="step-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </div>

        </div>

      </div>
     

  </div>;
}
