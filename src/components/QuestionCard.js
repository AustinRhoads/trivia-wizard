import React, { useState} from 'react';
import {decode} from 'html-entities';
import cuid from 'cuid'

export default function QuestionCard(props) {

    const {type, question, correct_answer} = props.question_object
    const shuffled_choices = props.shuffled_choices;
    const [selectedAnswer, setSelectedAnswer] = useState("")
  
   


    const render_choices = () =>{

           return type === "multiple" ? multiple_choice_element(shuffled_choices): multiple_choice_element(["True", "False"])
    }

  


    const select_answer = (e) => {
       console.log(e.target.value)
        
            setSelectedAnswer(e.target.value)
        
       
    }

    const multiple_choice_element = (choices) => {
        return <div className="multiple-choice-element">
            {choices.map((choice, index) =>  

               <button key={cuid()} onClick={e => select_answer(e)} className="answer-choices" value={choice}>{choice}</button>
               )
            }
        </div>
    }

    const submit_answer = (e) => {
            
        
            if(answer_is_correct()){            
                props.change_score(10);
                console.log(`${correct_answer} is Correct!`)
                setSelectedAnswer("")
            } else {
              
                props.change_score(-5);
                console.log(`Sorry, the correct answer is ${correct_answer}`)
            }       
           props.go_to_next_question()
    }

    const answer_is_correct = () => {
        return selectedAnswer === decode(correct_answer)
    }





  return <div id="question-card">
      {<div className="question-div">{decode(question)}</div>}
      {render_choices()}
      <button className="submit-answer" onClick={(e) => submit_answer(e)}>Submit</button>
  </div>;
}





///Where is the train station "Llanfair­pwllgwyngyll­gogery­chwyrn­drobwll­llan­tysilio­gogo­goch"?