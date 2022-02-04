import React from 'react';

import QuestionCard from './QuestionCard';
import {decode} from 'html-entities';

export default function QuizPage(props) {

  const render_quiz = () => {
      if(props.quiz.length > 0){
        

        return props.quiz.map((q, i) => { 
        
          const shuffled_choices = shuffle_choices(q.incorrect_answers, q.correct_answer);
         

        return <QuestionCard key={33 + i} shuffled_choices={shuffled_choices} question_object={q}/>
      });
        
      } else{
        <h2>Loading...</h2>
      }
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
      <h1>QUIZ</h1>
    {render_quiz()}
  </div>;
};
