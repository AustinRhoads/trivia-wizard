//import SEARCH_ROUTES from './constants/SearchRoutes';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

import QuizActions from './actions/QuizActions';

import QuizPage from './components/QuizPage';

import './App.css';


//TODO:
//1. CREATE TOKEN SYSTEM
//
//2. CREATE QUIZ PAGE/COMPONENT
//
//3. CREATE QUESTION COMPONENT
//
//4. CREATE POINTS ATTRIBUTE TO GLOBAL STATE
//
//5. CREATE ANSWER CHECKER
//
//6. ADD POINTS TO GLOBAL STATE
//
//7.USERS AND BACKEND MUAHAHAHAHA

function App() {

  const dispatch = useDispatch();
  const [category, setCategory] = useState(9)
  const [difficulty, setDifficulty] = useState("easy")

  const categories = useSelector(state => state.quiz_state.categories)
  const quiz = useSelector(state => state.quiz_state.quiz)

const submit_trivia_request = (e) => {
  e.preventDefault();
  dispatch(QuizActions.GET_QUIZ({category, difficulty}))
  let quiz = document.getElementById('quiz');
  quiz.classList.remove("quiz-off");
  quiz.classList.add("quiz-on");
}

const get_categories = () => {
  if(categories.length <= 0){
  
    dispatch(QuizActions.GET_CATEGORIES());
  } 
}

const return_category_options = () => {
  if(categories.length >= 0){
    return categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)
  }
}

const update_category = (e) => {
  setCategory(e.target.value);
}

const set_difficulty = (e) => {
  setDifficulty(e.target.value)

}

const show_quiz = () => {
  if(quiz.length > 0){
    console.log("gots a quiz yo");
    console.log(quiz)
  }
}

useEffect(() => {
  get_categories()
  show_quiz()
})

  return (
    <div className="App">

      <h1 id="app-banner">Trivia Wizard</h1>

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


        <input type="submit" value="SUMBIT" />

      </form>



      <QuizPage quiz={quiz}/>

    </div>
  );
}

export default App;
