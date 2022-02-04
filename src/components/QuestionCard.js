import React, { useState} from 'react';
import {decode} from 'html-entities';
import cuid from 'cuid'

export default function QuestionCard(props) {

    const {type, question, correct_answer} = props.question_object
    const shuffled_choices = props.shuffled_choices;
    const [selectedAnswer, setSelectedAnswer] = useState("")
   


    const render_choices = () =>{
            if(type === "multiple"){

               return multiple_choice_element(shuffled_choices)

            } else if (type === "boolean"){
                return multiple_choice_element(["True", "False"])
                
            }
    }

  


    const select_answer = (e) => {
        setSelectedAnswer(e.target.value)
    }

    const multiple_choice_element = (choices) => {
        return <div>
            {choices.map((choice, index) =>  

                <label htmlFor={choice} key={cuid()}> 

                    <input 
                        id={choice} 
                        checked={selectedAnswer === choice}
                        onChange={e => select_answer(e)}
                        type="radio" value={choice}/>

                {choice}</label>)
            }
        </div>
    }




  return <div className="question-card">
      {decode(question)}
      {render_choices()}
  </div>;
}





///Where is the train station "Llanfair­pwllgwyngyll­gogery­chwyrn­drobwll­llan­tysilio­gogo­goch"?