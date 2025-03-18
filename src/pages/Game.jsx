import { useState, useContext, useEffect } from 'react'
import '../assets/Game.css'
import { CrossSvg, CircleSvg, RestartSvg } from "../Svg";
import { GameContext } from "./GameContext";

export default function Game() {
  const { playerMark, setPlayerMark } = useContext(GameContext);
  const [boxes, setBoxes] = useState(Array(9).fill(null)); // 9 kutuluk bir array başlangıçta null
  const [emptyBoxes, setEmptyBoxes] = useState([...Array(9).keys()]); // boş kutuların indexlerini saklar
  const [isUserTurn, setIsUserTurn] = useState(true); // sıranın kullancıya geçtiği state

  const [userChoices, setUserChoices] = useState([]); // kullanıcının seçtiği kutuların indexlerini tutar
  const [cpuChoices, setCpuChoices] = useState([]);
  const [selectedMark, setSelectedMark] = useState(null);  // Seçilen markı tut

  // Component mount edildiğinde localStorage'dan playerMark'ı al
  useEffect(() => {
    const storedMark = localStorage.playerMark;
    if (storedMark) {
      setSelectedMark(storedMark);  // localStorage'dan alınan değeri state'e set et
      setPlayerMark(storedMark);  // Context'e de kaydet
    }
  }, [setPlayerMark]);

  useEffect(() => {
    console.log("Seçilen işaret:", selectedMark);  // Seçilen mark doğru şekilde geliyor mu kontrol et
  }, [selectedMark]);

  // kazanılan kombinasyonların tamamı
  const winnerCombs = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
  [2, 5, 8], [0, 4, 8], [2, 4, 6]]


  function checkWinner(choices) {
    return winnerCombs.some(comb => comb.every(index => choices.includes(index)));
  }


  function handleBox(index) {
    if (!isUserTurn || boxes[index]) return; // kullanıcı sırası değilse veya kutu doluysa işlem yapma

    const newBoxes = [...boxes];

    if (playerMark === "X") {
      newBoxes[index] = <CrossSvg />;
    } else {
      newBoxes[index] = <CircleSvg />;
    }

    const updatedEmptyBoxes = emptyBoxes.filter(i => i !== index);
    const newUserChoices = [...userChoices, index];

    setBoxes(newBoxes);
    setEmptyBoxes(updatedEmptyBoxes);
    setUserChoices(newUserChoices);
    setIsUserTurn(false); // sıra bilgisayara geçer

    if (checkWinner(newUserChoices)) {
      alert("Tebrikler! Kazandınız 🎉");
      return;
    }

    setTimeout(() => {
      handleCPUMove(updatedEmptyBoxes, newBoxes);
    }, 750);
  }


  function handleCPUMove(updatedEmptyBoxes, updateBoxes) {
    if (updatedEmptyBoxes.length === 0) return;

    const x = Math.floor(Math.random() * updatedEmptyBoxes.length);
    const cpuIndex = updatedEmptyBoxes[x];

    const newCpuChoices = [...cpuChoices, cpuIndex]
    setCpuChoices(newCpuChoices);


    if (checkWinner(newCpuChoices)) {
      alert("CPU Kazandı 🎉");
      return;
    }

    const newBoxes = [...updateBoxes];
    if (playerMark === "X") {
      newBoxes[cpuIndex] = <CircleSvg />;
    } else {
      newBoxes[cpuIndex] = <CrossSvg />;
    }

    setBoxes(newBoxes);
    setEmptyBoxes(prev => prev.filter(i => i !== cpuIndex));
    setIsUserTurn(true); // sıra kullanıcıya geçer
  }


  return (
    <div className="game-area">
      <div className="game-boxes-area">
        {boxes.map((box, i) => (
          <div key={i} className="box" onClick={() => handleBox(i)}>
            {box}
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
