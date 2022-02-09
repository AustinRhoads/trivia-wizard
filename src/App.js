//import SEARCH_ROUTES from './constants/SearchRoutes';
import { useEffect, useState, useMemo } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import QUIZ_ACTIONS from './actions/QuizActions';
import USER_ACTIONS from './actions/UserActions';

import QuizPage from './components/QuizPage';
import Login from './components/Login';
import Home from './components/Home';

import './App.css';
import QuizForm from './components/QuizForm';



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
  
  const [score, setScore] = useState(0)
  //const [retrievedCounts, setRetrievedCounts] = useMemo(false)



  const categories = useSelector(state => state.quiz_state.categories)
  const quiz = useSelector(state => state.quiz_state.quiz)
//  const all_counts = useSelector(state => state.quiz_state.all_counts);
  const all_counts_are_fetched = useSelector(state => state.quiz_state.all_counts_are_fetched)



  const user_state = useSelector(state => state.user_state)
  const logged_in = useSelector(state => state.user_state.logged_in)





const get_categories = () => {
  if(categories.length <= 0){
  
    dispatch(QUIZ_ACTIONS.GET_CATEGORIES());
  } 
}



const get_category_question_counts = () => {
  dispatch(QUIZ_ACTIONS.GET_CATEGORY_QUESTION_COUNTS({category: category}))
  
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

const get_all_counts = () => {
  let cat_array = []
  
  if(categories.length > 0 && !all_counts_are_fetched ){
    
    categories.forEach(cat => {
      cat_array.push({category: cat.id})
     
    })
    dispatch(QUIZ_ACTIONS.GET_ALL_COUNTS(cat_array))

  }
}





useEffect(() => {
  get_categories()
  get_all_counts()
  show_quiz()
  get_category_question_counts()
})

  return (
    <div className="App">

      <h1 id="app-banner"><a href="/">Trivia Wizard</a></h1>
      <h2>Score: {score}</h2>
      <Router>
        <Routes>

          <Route path="/" element={<Home logout_user={logout_user} logged_in={logged_in} />} />
          <Route path="/login" element={ <Login login_user={login_user} logged_in={logged_in} loading={user_state.loading} log_in_errors={user_state.log_in_errors} /> } />
          <Route path="/game" element={<QuizForm categories={categories} />} />
        </Routes>
      </Router>
     


      



      <QuizPage quiz={quiz} />

    </div>
  );
}

export default App;
