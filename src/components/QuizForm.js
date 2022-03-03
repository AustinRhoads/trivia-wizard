import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import cuid from 'cuid'

import QUIZ_ACTIONS from '../actions/QuizActions';
import GAME_ACTIONS from '../actions/GameActions';

export default function QuizForm(props) {

    const [category, setCategory] = useState('9');
    const [numberOfRounds, setNumberOfRounds] = useState(1);
    const [questionsPerRound, setQuestionsPerRound] = useState(10);
    const [players, setPlayers] = useState(2);
    const [gameSubmitted, setGameSubmitted] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const [difficulty, setDifficulty] = useState("easy");
    

    const easyCount = useSelector(state => state.quiz_state.easyCount)  
    const mediumCount = useSelector(state => state.quiz_state.mediumCount)
    const hardCount = useSelector(state => state.quiz_state.hardCount)
    const totalCount = useSelector(state => state.quiz_state.totalCount)
    const all_counts = useSelector(state => state.quiz_state.all_counts)
    const quiz_token = useSelector(state => state.quiz_state.quiz_token)

  


  const game = useSelector(state => state.game_state.game)
    




    const submit_trivia_request = async (e) => {
        e.preventDefault();

        //SET DIFFICULTY***
       // dispatch(QUIZ_ACTIONS.GET_QUIZ({category, difficulty}, get_max_or_ten_questions()))

        //GET SINGLE QUIZ AND START ANSWERING
        //dispatch(QUIZ_ACTIONS.GET_QUIZ({category, numberOfRounds, questionsPerRound, players, quiz_token}, questionsPerRound))
        //await props.start_game()
        //let quiz = document.getElementById('quiz');
        //quiz.classList.remove("quiz-off");
        //quiz.classList.add("quiz-on");

        var rounds = []; 

        for(let x = 0; x < parseInt(numberOfRounds); x++ ){
          rounds.push({round_number: x + 1, category: category, quiz_token: quiz_token})
        }

        const request_object = {
          category,
          number_of_rounds: numberOfRounds,
          questions_per_round: questionsPerRound,
          players,
          join_code: cuid().slice(-7).toUpperCase(),
          quiz_token,
          rounds: rounds,
        }

        dispatch(GAME_ACTIONS.GET_NEW_GAME(request_object))

        setGameSubmitted(gameSubmitted => gameSubmitted = true);

        await props.start_game()
        //let quiz = document.getElementById('quiz');
        //quiz.classList.remove("quiz-off");
        //quiz.classList.add("quiz-on");

      }

      const return_category_options = () => {
        if(props.categories.length >= 0){
          return props.categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name.replace("Entertainment: ", "").replace("Science: ", "")}</option>)
        }
      }

      const update_category = async (e) => {
        await setCategory(e.target.value);
        //get_category_question_counts()
       }

      // const set_difficulty = (e) => {
      //  setDifficulty(e.target.value)
      //}

     // const get_max_or_ten_questions = () => {
     //   switch(difficulty){
     //     case "easy":
     //     return easyCount >= 10 ? 10:easyCount;
     //     case "medium":
     //     return mediumCount  >= 10 ? 10:mediumCount;
     //     case "hard":
     //     return hardCount >= 10 ? 10:hardCount;
     //     case "any":
     //     return totalCount  >= 10 ? 10:totalCount;
     //     default:
     //       return 10;
     //   }
     // }

       const update_numberOfRounds = (e) => {
         setNumberOfRounds(e.target.value);
       }
      
       const update_questions_per_round = (e) => {
         setQuestionsPerRound(e.target.value);
       }

       const update_players = (e) => {
         setPlayers(e.target.value)
       }
      
      
      const display_category_stats = () => {
        return(
            <table id="category-stats-table">
              <tbody>
            <tr>
              <th>Difficulty</th>
              <th>Questions</th>
            </tr>
      
            <tr>
              <td>Easy</td>
              <td>{easyCount}</td>
            </tr>
      
            <tr>
              <td>Medium</td>
              <td>{mediumCount}</td>
            </tr>
      
            <tr>
              <td>Hard</td>
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


        
        <br/>
      
      <form id="quiz-form" onSubmit={e => {submit_trivia_request(e)}}>


        <label htmlFor="category-input">Your Study: </label>

        <select id="category-input" onChange={e => update_category(e)} value={category}>
          {return_category_options()}
        </select>
        
        <br/>

        <label htmlFor="numberOfRounds-input">Number Of Rounds: </label>
        <select id="numberOfRounds-input" onChange={e => update_numberOfRounds(e)} value={numberOfRounds}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
      
        </select>
        <br/>

        <label htmlFor="questions-per-round-input">Questions Per Round: </label>
        <select id="questions-per-round-input" onChange={e => update_questions_per_round(e)} value={questionsPerRound}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
        </select>

        
        <br/>

        <br/>

        <label htmlFor="player-input">Players: </label>
        <select id="player-input" onChange={e => update_players(e)} value={players}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={3}>4</option>

        </select>
        <br/>




      

       {/*

         <label htmlFor="difficulty-input">Difficulty: </label>
       
       <select id="difficulty-input" value={difficulty} onChange={e => set_difficulty(e)}>

          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="any">Surpise Me</option>

        </select>

       */

       } 


        <br/>

        {display_category_stats()}        
 


        <input type="submit" value="SUMBIT" />

      </form>
  </div>;
}
