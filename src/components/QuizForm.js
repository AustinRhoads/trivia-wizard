import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import QUIZ_ACTIONS from '../actions/QuizActions';

export default function QuizForm(props) {

    const [category, setCategory] = useState('9');

    const dispatch = useDispatch();
    const [difficulty, setDifficulty] = useState("easy");
    //const categories = useSelector(state => state.quiz_state.categories)

    const easyCount = useSelector(state => state.quiz_state.easyCount)  
    const mediumCount = useSelector(state => state.quiz_state.mediumCount)
    const hardCount = useSelector(state => state.quiz_state.hardCount)
    const totalCount = useSelector(state => state.quiz_state.totalCount)
    const all_counts = useSelector(state => state.quiz_state.all_counts)
    




    const submit_trivia_request = (e) => {
        e.preventDefault();
        dispatch(QUIZ_ACTIONS.GET_QUIZ({category, difficulty}, get_max_or_ten_questions()))
        let quiz = document.getElementById('quiz');
        quiz.classList.remove("quiz-off");
        quiz.classList.add("quiz-on");
      }

      const return_category_options = () => {
        if(props.categories.length >= 0){
          return props.categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)
        }
      }

      const update_category = async (e) => {
        await setCategory(e.target.value);
        //get_category_question_counts()
       }

       const set_difficulty = (e) => {
        setDifficulty(e.target.value)
      }

      const get_max_or_ten_questions = () => {
        switch(difficulty){
          case "easy":
          return easyCount >= 10 ? 10:easyCount;
          case "medium":
          return mediumCount  >= 10 ? 10:mediumCount;
          case "hard":
          return hardCount >= 10 ? 10:hardCount;
          case "any":
          return totalCount  >= 10 ? 10:totalCount;
          default:
            return 10;
        }
      }
      
      
      
      const display_category_stats = () => {
        return(
            <table>
              <tbody>
            <tr>
              <th>Difficulty</th>
              <th>Questions</th>
            </tr>
      
            <tr>
              <td>Acolyte</td>
              <td>{easyCount}</td>
            </tr>
      
            <tr>
              <td>Apprentice</td>
              <td>{mediumCount}</td>
            </tr>
      
            <tr>
              <td>Master</td>
              <td>{hardCount}</td>
            </tr>
      
            <tr>
              <td>Total</td>
              <td>{totalCount}</td>
            </tr>
      
            </tbody>
          </table>
        )
      }



      useEffect(() => {

        const get_category_question_counts = () => {
            if(all_counts[`category_${category}_question_count`]){

                dispatch(QUIZ_ACTIONS.SET_COUNTS_FROM_OBJECT(all_counts[`category_${category}_question_count`]))
            } else{
                dispatch(QUIZ_ACTIONS.GET_CATEGORY_QUESTION_COUNTS({category: category}))
            }
        } 
      
        get_category_question_counts();
        
        
        
      }, [category, all_counts, dispatch])




  return <div id="quiz-form-div">
      
      <form id="quiz-form" onSubmit={e => {submit_trivia_request(e)}}>


        <label htmlFor="cat">Your Study: </label>

        <select id="cat" onChange={e => update_category(e)} value={category}>
          {return_category_options()}
        </select>

        
        <br/>


        <label htmlFor="difficulty">Difficulty: </label>

        <select id="difficulty" value={difficulty} onChange={e => set_difficulty(e)}>

          <option value="easy">Acolyte</option>
          <option value="medium">Apprentice</option>
          <option value="hard">Master</option>
          <option value="any">Surpise Me</option>

        </select>


        <br/>

        {display_category_stats()}        
 


        <input type="submit" value="SUMBIT" />

      </form>
  </div>;
}
