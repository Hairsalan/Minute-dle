import React from 'react'

export default function Modal({isCorrect, turn, solution, timer}) {
  return (
    <div className = "modal"> 
    {isCorrect && (
        <div>
            <h1>You Win!</h1>
            <p className = "solution:">{solution}</p>
            <p>Solution found in {turn} turns.</p>
        </div>
    )}
    {!isCorrect && (
        <div>
            <h1>You Lose!</h1>
            <p className = "solution:">{solution}</p>
        </div>
    )}
    
    </div>
  )
}
