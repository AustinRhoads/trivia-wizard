//import SEARCH_ROUTES from './constants/SearchRoutes';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import QUIZ_ACTIONS from './actions/QuizActions';
import USER_ACTIONS from './actions/UserActions';

import QuizPage from './components/QuizPage';

import Login from './components/Login';

import './App.css';


//TODO:
//1. CREATE TOKEN SYSTEM
//
//2. CREATE QUIZ PAGE/COMPONENT---CHECK
//
//3. CREATE QUESTION COMPONENT
//
//4. CREATE POINTS ATTRIBUTE TO GLOBAL STATE
//
//5. CREATE ANSWER CHECKER
//
//6. ADD POINTS TO GLOBAL STATE
//
//7.USERS AND BACKEND MUAHAHAHAHA--

function App() {

  const dispatch = useDispatch();
  const [category, setCategory] = useState(9);
  const [difficulty, setDifficulty] = useState("easy");
  const [score, setScore] = useState(0)



  const categories = useSelector(state => state.quiz_state.categories)
  const quiz = useSelector(state => state.quiz_state.quiz)
//  const all_counts = useSelector(state => state.quiz_state.all_counts);

  const easyCount = useSelector(state => state.quiz_state.easyCount)  
  const mediumCount = useSelector(state => state.quiz_state.mediumCount)
  const hardCount = useSelector(state => state.quiz_state.hardCount)
  const totalCount = useSelector(state => state.quiz_state.totalCount)

  const user_state = useSelector(state => state.user_state)
  const logged_in = useSelector(state => state.user_state.logged_in)



const submit_trivia_request = (e) => {
  e.preventDefault();
  dispatch(QUIZ_ACTIONS.GET_QUIZ({category, difficulty}, get_max_or_ten_questions()))
  let quiz = document.getElementById('quiz');
  quiz.classList.remove("quiz-off");
  quiz.classList.add("quiz-on");
}

const get_categories = () => {
  if(categories.length <= 0){
  
    dispatch(QUIZ_ACTIONS.GET_CATEGORIES());
  } 
}

const return_category_options = () => {
  if(categories.length >= 0){
    return categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)
  }
}

const get_category_question_counts = () => {
  dispatch(QUIZ_ACTIONS.GET_CATEGORY_QUESTION_COUNTS({category: category}))
  
}

const update_category = async (e) => {
 await setCategory(e.target.value);
 get_category_question_counts()
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

const login_user = (user, functions_object) => {
  dispatch(USER_ACTIONS.LOGIN(user, functions_object))
}

const logout_user = () => {
  dispatch(USER_ACTIONS.LOGOUT())
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
  get_categories()
  show_quiz()
  get_category_question_counts()
})

  return (
    <div className="App">

      <h1 id="app-banner">Trivia Wizard</h1>
      <h2>Score: {score}</h2>
      <Router>
        <Routes>
          <Route path="/login" element={ <Login login_user={login_user} logged_in={logged_in} loading={user_state.loading} log_in_errors={user_state.log_in_errors} /> } />

        </Routes>
      </Router>
     

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

      



      <QuizPage quiz={quiz}/>

    </div>
  );
}

export default App;
