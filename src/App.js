//import SEARCH_ROUTES from './constants/SearchRoutes';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Route, Routes, useNavigate, useLocation} from 'react-router-dom'

import { FaHeart } from "react-icons/fa";
//import QRCode from 'qrcode.react';

import QUIZ_ACTIONS from './actions/QuizActions';
import USER_ACTIONS from './actions/UserActions';
import ROUTING_ACTIONS from './actions/RoutingActions';


import Login from './components/Login';
import Home from './components/Home';
import Game from './components/Game';

import UserIcon from './images/kisspng-person-logo-computer-icons-5af2c2029ca2b1.9101275115258588186416.png'

import './App.css';


function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  


  const game = useSelector(state => state.game_state.game);
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

  const create_user = (user, functions_object) => {
    dispatch(USER_ACTIONS.CREATE_USER(user, functions_object))
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
  if(logged_in){
    return <div id="account-div">
    <img id="user-icon" alt="user-img" src={UserIcon} />
    <button className="btns-inverted" onClick={() => logout_user()}>Log out</button>
  </div>
  }

}

const redirect_if_not_logged_in = () => {
  if(!logged_in){
    dispatch(ROUTING_ACTIONS.SET_NEXT_ROUTE(location.pathname))
    navigate('/login', {replace: true})
  }
}



const next_route = useSelector(state => state.routing_state.next_route);
const need_to_reroute = useSelector(state => state.routing_state.need_to_reroute);

const functions_object = {
    redirect_to_home: () => redirect_to_home(),
    need_to_reroute: need_to_reroute,
    next_route: next_route,
    redirect_to: (next_route) => {
        redirect_to(next_route);
       
    },
    reset_next_route: () =>  {
      dispatch(ROUTING_ACTIONS.RESET_NEXT_ROUTE())
    },
}

const redirect_to_home = () => {
    navigate('/', {replace: true})
}

const redirect_to = (next_route) => {
    navigate(next_route, {replace: true})
}









useEffect(() => {
  get_categories()
  get_all_counts()
  show_quiz()
 
})

  return (
    <div className="App">

    <div id="top-nav">

      <h1 id="app-banner"><a href="/"><span className="flicker"><span className="long-flicker">T</span>RIVIA NI<span className="fast-flicker">G</span>HT</span></a></h1>
      {render_account_div()}

    </div>

      
        <Routes>

          <Route path="/" element={<Home logout_user={logout_user} logged_in={logged_in}  />} />
          
          <Route path="/login" element={ <Login functions_object={functions_object} login_user={login_user} logged_in={logged_in}  loading={user_state.loading} log_in_errors={user_state.log_in_errors} create_user={create_user} /> } />
          <Route path="/game" element={<Game game={game} categories={categories} logged_in={logged_in} redirect_if_not_logged_in={redirect_if_not_logged_in} quiz={quiz} />} />

        </Routes>
      
     
    {/*<QRCode value="https://www.austinrhoads-code.com" />*/}

    <footer>
    <p>Created with < FaHeart id="fa-heart" /> by Austin Rhoads</p>
    </footer>
    </div>
  );
}

export default App;
