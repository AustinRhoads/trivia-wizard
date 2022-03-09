import React, { useEffect, useState } from 'react'
import ReactCodeInput from 'react-code-input';
import { useNavigate } from 'react-router-dom';
//import GAME_ACTIONS from '../actions/GameActions';
import { useDispatch } from 'react-redux';

import GAME_ROUTES from '../constants/GameRoutes';
import GAME_ACTIONS from '../actions/GameActions';


const {JOIN_ROUTE} = GAME_ROUTES;



export default function JoinPage(props) {

    const navigate= useNavigate();

    const {redirect_if_not_logged_in} = props;
    const dispatch = useDispatch();    
    const [errors, setErrors] = useState([])

    const  update_join_code = async (e) => {
        if(e.length === 7){
           search_for_game(e.toUpperCase())
           
        }        
    }

    const search_for_game = (code) => {
        fetch(JOIN_ROUTE + `/${code}`,).then(resp => resp.json()).then(obj => {
            if(obj.status === 200){
                console.log(obj)
                dispatch(GAME_ACTIONS.SET_GAME(obj))
                navigate( "/lobby", {replace: false})
            } else {
                setErrors(errors => errors = [...errors, obj.error])
            }
            
    })
    }

    const render_errors = () => {
        if(errors.length > 0){
            return errors.map(error => <div className="error" key={`${error}`}>{error}</div>)
           
        }
    }

    useEffect(() => {
        redirect_if_not_logged_in()
    })

  return (
    <div id="join-page">
        

        <form id="join-game-form">
            <label id="join-game-label-1">7 DIGIT JOIN CODE</label>
            <div style={{height: 30}}></div>
            {render_errors()}
           
            <div style={{height: 60}}></div>
            <ReactCodeInput type='text'  onChange={(e) => update_join_code(e)}  fields={7}  />
            <br/>
            {/*<button className="btns">Submit</button>*/}
        </form>
        
    </div>
  )
};
