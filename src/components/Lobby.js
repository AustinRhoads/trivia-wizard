import React, { useEffect } from 'react'

export default function Lobby(props) {

  const {game} = props

  const render_join_code = () => {
    
    if(game.join_code){
      return <h1>JOIN CODE: {game.join_code}</h1>
    }
  }

  useEffect(() => {
    
  })
  return (
    <div id="lobby">
      {render_join_code()}
      </div>
  )
}
