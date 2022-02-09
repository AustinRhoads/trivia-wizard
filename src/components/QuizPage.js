import React, {useState} from 'react';

import QuestionCard from './QuestionCard';
import {decode} from 'html-entities';

export default function QuizPage(props) {

  const {score} = props;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false)



  const go_to_next_question = () => {
    const next_question = currentQuestion + 1
    if(next_question <= props.quiz.length - 1){
      setCurrentQuestion(next_question)
    } else {
      setShowScore(true)
    }
  }

  const render_quiz = () => {
    if(props.quiz.length > 0){

      const shuffled_choices = shuffle_choices(props.quiz[currentQuestion].incorrect_answers, props.quiz[currentQuestion].correct_answer);
      return <QuestionCard go_to_next_question={go_to_next_question} change_score={props.change_score}  shuffled_choices={shuffled_choices} question_object={props.quiz[currentQuestion]}/>
    }
  }

  const render_score_page = () => {
    return <div id="score-page">
      <h1>Total: {score}</h1>
    </div>
  }



  const shuffle_choices = (incorrect_answers, correct_answer) => {
    let copyone = incorrect_answers.slice();
    copyone.push(correct_answer)
    let copy = [];
    copyone.map(choice => copy.push(decode(choice)))
    let result = [];
    while(copy.length > 0){
        const random_index = Math.floor(Math.random() * copy.length)
        result.push(copy[random_index]);
        copy.splice(random_index, 1);
    }

    return result

}

  return <div id="quiz" className="quiz-off">
      <h1>QUIZ SCORE: {props.score}</h1>
    { showScore ?  render_score_page():render_quiz()}
  </div>;
};
