import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import QuizForm from './QuizForm';
import QuizPage from './QuizPage';

export default function Game(props) {

  const loading_game = useSelector(state => state.game_state.loading_game);
  const rounds = useSelector(state => state.game_state.rounds)

  const {quiz, categories, redirect_if_not_logged_in, game} = props;

  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  const change_score = (points = 10) => {
    const updated_score = score + points;
    setScore(updated_score);
  }

  const show_form = () => {
    return <QuizForm start_game={start_game} categories={categories}  />
  }

  const show_quiz = () => {
    return loading_game ?  <h2>Loading...</h2> : <QuizPage quiz={quiz} score={score} change_score={change_score}/>
  }

  const start_game = () => {
    setGameStarted(true)
  }

  useEffect(() => {
    redirect_if_not_logged_in()
    console.log("join_code", game.join_code)
    console.log("useEffect in game rounds: ",rounds)
  }, [rounds])


  return <div id="game">
    { gameStarted ?   show_quiz() : show_form() }

    
    

  </div>;
}
