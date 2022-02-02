import React from 'react';
import {decode} from 'html-entities';

export default function QuizPage(props) {

  const render_quiz = () => {
      if(props.quiz.length > 0){

        let htwo = document.createElement('h2');
        //htwo.innerHTML = props.quiz[0].question;
        return <div>{decode(props.quiz[0].question)}</div>;
        
      } else{
        <h2>Loading...</h2>
      }
  }

  return <div id="quiz" className="quiz-off">
      <h1>QUIZ</h1>
    {render_quiz()}
  </div>;
};
