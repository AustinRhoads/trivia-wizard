//import SEARCH_ROUTES from './constants/SearchRoutes';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import QUIZ_ACTIONS from './actions/QuizActions';
import USER_ACTIONS from './actions/UserActions';


import Login from './components/Login';
import Home from './components/Home';
import Game from './components/Game';

import UserIcon from './images/kisspng-person-logo-computer-icons-5af2c2029ca2b1.9101275115258588186416.png'

import './App.css';




//TODO:
//1. CREATE TOKEN SYSTEM
//
//2. CREATE QUIZ PAGE/COMPONENT---CHECK
//
//3. CREATE QUESTION COMPONENT --check
//
//4. CREATE POINTS ATTRIBUTE TO GLOBAL STATE --check
//
//5. CREATE ANSWER CHECKER --check
//
//6. ADD POINTS TO GLOBAL STATE --check
//
//7.USERS AND BACKEND MUAHAHAHAHA--check

function App() {

  const dispatch = useDispatch();
  
  



  const categories = useSelector(state => state.quiz_state.categories)
  const quiz = useSelector(state => state.quiz_state.quiz)
  const all_counts_are_fetched = useSelector(state => state.quiz_state.all_counts_are_fetched)



  const user_state = useSelector(state => state.user_state)
  const logged_in = useSelector(state => state.user_state.logged_in)


  const login_user = (user, functions_object) => {
    dispatch(USER_ACTIONS.LOGIN(user, functions_object))
  }
  
  const logout_user = () => {
    dispatch(USER_ACTIONS.LOGOUT())
  }



  const get_categories = () => {
    if(categories.length <= 0){
    
      dispatch(QUIZ_ACTIONS.GET_CATEGORIES());
    } 
  }





const show_quiz = () => {
  if(quiz.length > 0){
    console.log("gots a quiz yo");
    console.log(quiz)
  }
}



const get_all_counts = () => {
  let category_array = []
  
  if(categories.length > 0 && !all_counts_are_fetched ){
    
    categories.forEach(cat => {
      category_array.push({category: cat.id})
     
    })
    dispatch(QUIZ_ACTIONS.GET_ALL_COUNTS(category_array))

  }
}

const render_account_div = () => {
  return <div id="account-div">
    <img id="user-icon" alt="user-img" src={UserIcon} />
  </div>
}






useEffect(() => {
  get_categories()
  get_all_counts()
  show_quiz()
})

  return (
    <div className="App">

    <div id="top-nav">

      <h1 id="app-banner"><a href="/">Trivia Wizard</a></h1>
      {render_account_div()}

    </div>

      <Router>
        <Routes>

          <Route path="/" element={<Home logout_user={logout_user} logged_in={logged_in} />} />
          <Route path="/login" element={ <Login login_user={login_user} logged_in={logged_in} loading={user_state.loading} log_in_errors={user_state.log_in_errors} /> } />
          <Route path="/game" element={<Game categories={categories} quiz={quiz} />} />

        </Routes>
      </Router>
     



    </div>
  );
}

export default App;
