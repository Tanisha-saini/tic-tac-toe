import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Square from './Components/Square'
import Board from './Components/Board'
import WinnerBanner from './WinnerBanner'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use-window-size';

function App() {

  const [status, setStatus] = useState('')
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [isX, setIsX] = useState(true)

  const calculateWinner = (squares) => {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    
    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const handleRestart=()=>{
    setSquares(Array(9).fill(null))
    setIsX(true)
  }

  const handleClick = (i) =>{
      if(calculateWinner(squares) || squares[i]){
          return
      }

      squares[i] = isX ? 'X' : 'O'
      setSquares(squares)
      setIsX(!isX)
    }
  // console.log(isX)

  const winner=calculateWinner(squares)

  useEffect(()=>{
    if(winner){
      setStatus(`${winner} wins the game!`)
    }
    else
      setStatus('Next player: ' + (isX ? 'X' : 'O'))
  }, [isX])

  
  const { width, height } = useWindowSize()
  return (
    <div className="App">
      <h1 className="heading">
        <span>TIC   </span>
        <span>TAC   </span>
        <span>TOE</span>
      </h1>
      <Board squares={squares} handleClick={handleClick}/>
      <div className="status">{status}</div>
      <button className="restart" onClick={handleRestart}>Restart Game!</button>
      {winner 
        ? <>
            <WinnerBanner winplayer={winner}/>
            <Confetti width={width} height={height} />
          </>
        
        : <></>}
    </div>
  )
}

export default App
