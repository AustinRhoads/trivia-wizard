//import SEARCH_ROUTES from './constants/SearchRoutes';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

import QuizActions from './actions/QuizActions';

import './App.css';

function App() {

  const dispatch = useDispatch();
  const [category, setCategory] = useState(9)
  const [difficulty, setDifficulty] = useState("easy")

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
    console.log(categories)
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

useEffect(() => {
  get_categories()
})

  return (
    <div className="App">

      <h1>Trivia Wizard</h1>

      <form onSubmit={e => {submit_trivia_request(e)}}>
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

    </div>
  );
}

export default App;
