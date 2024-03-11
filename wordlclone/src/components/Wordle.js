import React, {useEffect, useState} from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'


export default function Wordle({solution, timer, setFreezeTimer}) {
    const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } = useWordle(solution)
    const [showModal, setShowModal] = useState(false)


    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        if (isCorrect) {
            setFreezeTimer(true)
            setTimeout (() => setShowModal(true), 2000)
            window.removeEventListener('keyup', handleKeyup)
        }

        if (turn>5) {
            setFreezeTimer(true)
            setTimeout (() => setShowModal(true), 2000)
            window.removeEventListener('keyup', handleKeyup)
        }

        if (timer === 0) {
            setFreezeTimer(true)
            setTimeout (() => setShowModal(true), 2000)
            window.removeEventListener('keyup', handleKeyup)
        }

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup, isCorrect, turn, timer, setFreezeTimer])

    
    return (
        <div>
        <div> {solution} </div>
        <div>Current Guess - {currentGuess}</div>
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}/>
        <Keypad usedKeys={usedKeys}/>
        {showModal && <Modal isCorrect = {isCorrect} turn={turn} solution={solution} timer ={timer}/>}
        </div>
    )
}