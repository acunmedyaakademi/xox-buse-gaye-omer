import { useState } from 'react'
import '../assets/Game.css'
export default function Game() {

  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [emptyBoxes, setEmptyBoxes] = useState([...Array(9).keys()]);

  const [userChoices, setUserChoices] = useState([]);

  const winnerCombs = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
  [2, 5, 8], [0, 4, 8], [2, 4, 6]]

  function handleBox(index) {

    if (boxes[index]) {
      setUserChoices([]);
      console.log(userChoices);

      return;

    }

    const newBoxes = [...boxes];
    newBoxes[index] = "/img/x-icon.svg"
    const updatedEmptyBoxes = emptyBoxes.filter(i => i != index);

    userChoices.push(index);

    // console.log(newBoxes.length);
    setBoxes(newBoxes);
    setEmptyBoxes(updatedEmptyBoxes);
    // console.log('user : ' + index);

    setTimeout(() => {
      handleCPUMove(updatedEmptyBoxes, newBoxes);
    }, 750);
  }

  function handleCPUMove(updatedEmptyBoxes, updateBoxes) {

    if (emptyBoxes.length === 0) return;

    const x = Math.floor(Math.random() * updatedEmptyBoxes.length);
    const cpuIndex = updatedEmptyBoxes[x];


    const newBoxes = [...updateBoxes];
    newBoxes[cpuIndex] = "/img/o-icon.svg"
    // console.log('pc: ' + cpuIndex)

    setBoxes(newBoxes);

    setEmptyBoxes(prev => prev.filter(i => i != cpuIndex));
  }

  return (

    <div className="game-area">
      <div className="game-boxes-area">
        {boxes.map((box, i) => (
          <div key={i} className="box" onClick={() => handleBox(i)}>
            {box && <img src={box} />}
          </div>
        ))}
      </div>
      <div className="score-area">
        <div className="player-score-section">
          <h3>YOU</h3>
          <p className='player-score'>0</p>
        </div>
        <div className="ties-score-section">
          <h3>TIES</h3>
          <p className='player-score'>0</p>
        </div>
        <div className="cpu-score-section">
          <h3>CPU</h3>
          <p className='player-score'>0</p>
        </div>
      </div>
    </div>

  )
}
