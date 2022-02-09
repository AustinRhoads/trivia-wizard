import React, {useState} from 'react';
import QuizForm from './QuizForm';
import QuizPage from './QuizPage';

export default function Game(props) {

  const {quiz, categories} = props;

  const [score, setScore] = useState(0)

  const change_score = (points = 10) => {
    const updated_score = score + points;
    setScore(updated_score);
  }


  return <div id="game">
    <QuizForm categories={categories}  />
    <QuizPage quiz={quiz} score={score} change_score={change_score}/>

  </div>;
}
