import React, {useState,useEffect} from "react";
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App(){
    const [dice,setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [rolls, setRolls] = useState(0)
   
    useEffect(()=>{
        const gotTenzies = dice.every(die => die.value === dice[0].value && die.isHeld)
        if(gotTenzies){
            setTenzies(true)
        }
    },[dice])

    function generateRandomDie(){
        return{
            value: Math.ceil(Math.random()*6),
            isHeld: false,
            id:nanoid()
        }
    }
    function allNewDice(){
        const myDice = []
        for(let i = 0; i<10; i++){
            myDice.push(generateRandomDie())
        }
        return myDice
    }
    function holdDice(id){
        setDice(oldDice => oldDice.map(die=>{
           if(die.id === id){
                return {...die,
                        isHeld: !die.isHeld
                }
            }else{
                return die
            }
        }))
    }
    function rollDice(){
        if(!tenzies){
            setRolls(prevRoll => prevRoll+1)
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld? die : generateRandomDie()
            }))
        }else{
            setRolls(0)
            setDice(allNewDice())
            setTenzies(false)
        }
    }
    const diceElements = dice.map(die => {
        return <Die 
            key={die.id}
            isHeld={die.isHeld} 
            value={die.value}
            holdDice={()=>holdDice(die.id)}
        />
    })
    return(
        <main>
            {tenzies && <Confetti/>}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same.Click each die to freeze it at its current value between rolls.</p>
          
            <h2>Roll Count: {rolls}</h2>
        <div className="dice-container">
        {diceElements}
        </div>
        <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}