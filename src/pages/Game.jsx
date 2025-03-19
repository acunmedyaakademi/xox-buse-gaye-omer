import { useState, useEffect, useContext } from "react";
import "../assets/Game.css";
import { CrossSvg, CircleSvg, RestartSvg } from "../Svg";
import { GameContext } from "./GameContext";

export default function Game() {
  const { playerMark, setPlayerMark } = useContext(GameContext);

  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [emptyBoxes, setEmptyBoxes] = useState([...Array(9).keys()]);
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [userChoices, setUserChoices] = useState([]);
  const [cpuChoices, setCpuChoices] = useState([]);
  const [gameOver, setGameOver] = useState(false); // Oyunun bittiğini takip eden state
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const winnerCombs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [selectedMark, setSelectedMark] = useState(null);

  useEffect(() => {
    const storedMark = localStorage.playerMark;
    if (storedMark) {
      setSelectedMark(storedMark);
      setPlayerMark(storedMark);
    }
  }, [setPlayerMark]);

  function resetGame() {
    setTimeout(() => {
      setBoxes(Array(9).fill(null));
      setEmptyBoxes([...Array(9).keys()]);
      setUserChoices([]);
      setCpuChoices([]);
      setIsUserTurn(true);
      setGameOver(false); // Oyunun bittiğini sıfırla
      setShowModal(false);
    }, 300);
  }

  function checkWinner(choices) {
    return winnerCombs.some((comb) =>
      comb.every((index) => choices.includes(index))
    );
  }

  function handleBox(index) {
    if (!isUserTurn || boxes[index] || gameOver) return; // Oyun bittiyse veya kutu doluysa işlem yapma

    const newBoxes = [...boxes];
    newBoxes[index] = playerMark === "X" ? <CrossSvg /> : <CircleSvg />;

    const updatedEmptyBoxes = emptyBoxes.filter((i) => i !== index);
    const newUserChoices = [...userChoices, index];

    setBoxes(newBoxes);
    setEmptyBoxes(updatedEmptyBoxes);
    setUserChoices(newUserChoices);

    if (checkWinner(newUserChoices)) {
      setGameOver(true); // Oyunu bitir
      setTimeout(() => {
        setWinner("YOU"); // Kazananı belirle
        setShowModal(true); // Modalı aç
      }, 200);
      return;
    }

    setIsUserTurn(false);

    setTimeout(() => {
      handleCPUMove(updatedEmptyBoxes, newBoxes);
    }, 750);
  }

  function handleCPUMove(updatedEmptyBoxes, updateBoxes) {
    if (updatedEmptyBoxes.length === 0 || gameOver) return; // Oyun bittiyse işlem yapma
  
    const x = Math.floor(Math.random() * updatedEmptyBoxes.length);
    const cpuIndex = updatedEmptyBoxes[x];
  
    const newCpuChoices = [...cpuChoices, cpuIndex];
    setCpuChoices(newCpuChoices);
  
    const newBoxes = [...updateBoxes];
    newBoxes[cpuIndex] = playerMark === "X" ? <CircleSvg /> : <CrossSvg />;
  
    const remainingEmptyBoxes = updatedEmptyBoxes.filter(i => i !== cpuIndex);
    setBoxes(newBoxes);
    setEmptyBoxes(remainingEmptyBoxes);
  
    if (checkWinner(newCpuChoices)) {
      setGameOver(true);
      setWinner("CPU");
      setShowModal(true);
      return;
    }
  
    setIsUserTurn(true);
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
          <p className="player-score">0</p>
        </div>
        <div className="ties-score-section">
          <h3>TIES</h3>
          <p className="player-score">0</p>
        </div>
        <div className="cpu-score-section">
          <h3>CPU</h3>
          <p className="player-score">0</p>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>
              {winner === "YOU" && "Tebrikler, Kazandınız!"}
              {winner === "CPU" && "CPU Kazandı!"}
              {winner === "TIE" && "Berabere!"}
            </h2>
            <div className="modal-buttons">
              <button onClick={() => window.location.href = "/choice-page"} className="quit-btn">
                Quit
              </button>
              <button onClick={resetGame} className="next-round-btn">
                Next Round
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
