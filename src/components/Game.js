import React, {useState} from 'react';
import QuizForm from './QuizForm';
import QuizPage from './QuizPage';

export default function Game(props) {

  const {quiz, categories} = props;

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
    return <QuizPage quiz={quiz} score={score} change_score={change_score}/>
  }

  const start_game = () => {
    setGameStarted(true)
  }


  return <div id="game">
    { gameStarted ?   show_quiz() : show_form() }

    
    

  </div>;
}
