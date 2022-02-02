//import SEARCH_ROUTES from './constants/SearchRoutes';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';

import QuizActions from './actions/QuizActions';

import './App.css';

function App() {

  const dispatch = useDispatch();

  const categories = useSelector(state => state.quiz_state.categories)

const submit_trivia_request = (e) => {
  e.preventDefault();
  console.log(e.target)
}

const get_categories = () => {
  if(categories.length <= 0){
    console.log("needs cats");
    dispatch(QuizActions.GET_CATEGORIES());
  } else {
    console.log("got cats");
  }
}

useEffect(() => {
  get_categories()
})

  return (
    <div className="App">

      <h1>Trivia Wizard</h1>

      <form onSubmit={e => {submit_trivia_request(e)}}>
        <input type="submit" value="SUMBIT" />
      </form>

    </div>
  );
}

export default App;
