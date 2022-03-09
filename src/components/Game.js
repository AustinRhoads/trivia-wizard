import React, {useEffect, useState} from 'react';
//import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import QuizForm from './QuizForm';
//import QuizPage from './QuizPage';

export default function Game(props) {

  const navigate = useNavigate()

  const loading_game = useSelector(state => state.game_state.loading_game);
  const rounds = useSelector(state => state.game_state.rounds)

  const {/*quiz,*/ categories, redirect_if_not_logged_in, game} = props;

  //const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

 // const change_score = (points = 10) => {
 //   const updated_score = score + points;
 //   setScore(updated_score);
 // }

  const show_form = () => {
    return <QuizForm start_game={start_game} categories={categories}  />
  }

  //const show_quiz = () => {
  //  return loading_game ?  <h2>Loading...</h2> : <QuizPage quiz={quiz} score={score} change_score={change_score}/>
  //}

  const reidrect_if_game_loaded = () => {
    if(loading_game){
      return <h2>Loading...</h2> 
    } else {
      navigate("/lobby", {replace: false})
    }
  }

  const start_game = () => {
    setGameStarted(true)
  }

  useEffect(() => {
    redirect_if_not_logged_in()
    console.log("join_code", game.join_code)
    console.log("useEffect in game rounds: ",rounds)
  }, [rounds, redirect_if_not_logged_in, game.join_code ])


  return <div id="game">
    {/* gameStarted ?   show_quiz() : show_form() */}
    {gameStarted ?   reidrect_if_game_loaded() : show_form()}

    
    

  </div>;
}
