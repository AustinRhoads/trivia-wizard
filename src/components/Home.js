import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';

import ROUTING_ACTIONS from '../actions/RoutingActions';
//import {useSelector} from 'react-redux';

//import Wizard from "../images/kisspng-king-arthur-magician-dungeons-dragons-fantasy-my-merlin-5b478c21b2e550.6693665515314155857328.png"
import Dynamic_img from "../images/kisspng-computer-icons-encapsulated-postscript-handheld-de-laptop-phone-icon-5b49db86a430a0.3590097415315669826725.png"
import QUIZ_ACTIONS from '../actions/QuizActions';




export default function Home(props) {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()


const { logged_in } = props;

const quiz_token = useSelector(state => state.quiz_state.quiz_token)

const redirect_to_login = () => {
    navigate('/login', {replace: false})
}

const check_quiz_token = () => {
    if(quiz_token === ''){
        dispatch(QUIZ_ACTIONS.GET_NEW_TOKEN())
    }
}



const redirect_to_game = () => {
    if(logged_in){
        check_quiz_token();
        navigate('/game', {replace: false})
    } else {
        dispatch(ROUTING_ACTIONS.SET_NEXT_ROUTE("/game"))
        dispatch(QUIZ_ACTIONS.GET_NEW_TOKEN())
        redirect_to_login()
    }
   
}

const redirect_to_join_game = () => {
    if(logged_in){
        check_quiz_token();
        navigate('/join-game', {replace: false})
    } else {
        dispatch(ROUTING_ACTIONS.SET_NEXT_ROUTE("/join-game"))
        dispatch(QUIZ_ACTIONS.GET_NEW_TOKEN())
        redirect_to_login()
    }
}



const new_game_button = () => {
    return <button className="btns" onClick={() => redirect_to_game()}>New Game</button>
}

const join_game_button = () => {
    return <button className="btns-inverted" onClick={() => redirect_to_join_game()}>Join Game</button>
}



const render_new_game_button = () => {
    if(logged_in){
        return <div id="home-buttons">
            {new_game_button()}
            {join_game_button()}
            
        </div>

    } else{
        return <div>
           {/* <div>{new_game_button()} as guest or  <button className="btns-inverted" onClick={() => redirect_to_login()}>Log in</button></div>*/}
           {new_game_button()}
           {join_game_button()}
        </div>

    }
}




  return <div id="home">
      
     <div id="home-top">
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

        <div id="animated-div">
            <h3 className="animated-h3"><span>This </span>WILL <span><span>BE </span><span>Animated</span></span></h3>
        </div>
      </div>


      <div id="homepage-how-to">
          <h1 className="header-one">HOW TO PLAY</h1>

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
