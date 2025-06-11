import { useState, useEffect, useContext } from "react";
import { Link } from "../Router";
import "../assets/Game.css";
import "../App.css";
import { CrossSvg, CircleSvg, RestartSvg } from "../Svg";
import { GameContext } from "./GameContext";

export default function Game() {
  const { playerMark, setPlayerMark, cpuMark, setCpuMark } =
    useContext(GameContext);

  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [emptyBoxes, setEmptyBoxes] = useState([...Array(9).keys()]);
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [userChoices, setUserChoices] = useState([]);
  const [cpuChoices, setCpuChoices] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ties, setTies] = useState(0);
  const [cpu, setCpu] = useState(0);
  const [player, setPlayer] = useState(0);

  const winnerCombs = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const [selectedMark, setSelectedMark] = useState(null);

  useEffect(() => {
    const storedMark = localStorage.getItem("playerMark");
    const storedCpuMark = localStorage.getItem("cpuMark");
    if (storedMark) {
      setSelectedMark(storedMark);
      setPlayerMark(storedMark);
      setCpuMark(storedCpuMark);
      setIsUserTurn(storedMark === "X");

      const userStarts = storedMark === "X";
      setIsUserTurn(userStarts);
      if (!userStarts) {
        // Eğer kullanıcı "O" seçtiyse CPU otomatik olarak ilk hamlesini yapar
        setTimeout(() => {
          handleCPUMove([...Array(9).keys()], Array(9).fill(null));
        }, 750);
      }
    }
  }, []);

  function resetGame() {
    setTimeout(() => {
      setBoxes(Array(9).fill(null));
      setEmptyBoxes([...Array(9).keys()]);
      setUserChoices([]);
      setCpuChoices([]);
      setGameOver(false);
      setShowModal(false);

      const userStarts = selectedMark === "X";
      setIsUserTurn(userStarts);

      if (!userStarts) {
        // Yeniden başlatıldığında da eğer kullanıcı "O" seçtiyse CPU başlamalı
        setTimeout(() => {
          handleCPUMove([...Array(9).keys()], Array(9).fill(null));
        }, 750);
      }
    }, 300);
  }

  function checkWinner(choices) {
    return winnerCombs.some((comb) =>
      comb.every((index) => choices.includes(index))
    );
  }

  function handleBox(index) {
    if (!isUserTurn || boxes[index] || gameOver) return;

    const newBoxes = [...boxes];
    newBoxes[index] = playerMark === "X" ? <CrossSvg /> : <CircleSvg />;

    const updatedEmptyBoxes = emptyBoxes.filter((i) => i !== index);
    const newUserChoices = [...userChoices, index];

    setBoxes(newBoxes);
    setEmptyBoxes(updatedEmptyBoxes);
    setUserChoices(newUserChoices);

    if (checkWinner(newUserChoices)) {
      setGameOver(true);
      setPlayer((prev) => prev + 1);
      setTimeout(() => {
        setWinner("YOU");
        setShowModal(true);
      }, 200);
      return;
    }

    if (updatedEmptyBoxes.length === 0) {
      setGameOver(true);
      setTies((prev) => prev + 1);
      setTimeout(() => {
        setWinner("TIE");
        setShowModal(true);
      }, 200);
      return;
    }

    setIsUserTurn(false);
    setTimeout(() => {
      handleCPUMove(updatedEmptyBoxes, newBoxes);
    }, 750);
  }

  function handleCPUMove(updatedEmptyBoxes, updateBoxes) {
    if (updatedEmptyBoxes.length === 0 || gameOver) return;

    const cpuIndex = updatedEmptyBoxes[Math.floor(Math.random() * updatedEmptyBoxes.length)];

    const newBoxes = [...updateBoxes];
    newBoxes[cpuIndex] = playerMark === "X" ? <CircleSvg /> : <CrossSvg />;

    const remainingEmptyBoxes = updatedEmptyBoxes.filter((i) => i !== cpuIndex);
    const newCpuChoices = [...cpuChoices, cpuIndex];

    setBoxes(newBoxes);
    setEmptyBoxes(remainingEmptyBoxes);
    setCpuChoices(newCpuChoices);

    setTimeout(() => {
      setIsUserTurn(true);
    }, 100);
  }

  useEffect(() => {
    if (gameOver && winner) {
      const timeout = setTimeout(() => {
        setShowModal(true);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [gameOver, winner]);


  useEffect(() => {
    if (!isUserTurn && !gameOver) {
      console.log("CPU'nun sırası, handleCPUMove çağrılıyor");
      setTimeout(() => {
        handleCPUMove(emptyBoxes, boxes);
      }, 750);
    }
  }, [isUserTurn, gameOver]);

  useEffect(() => {
    if (gameOver) return;

    const winnerCombo = winnerCombs.find((combo) => {
      const [a, b, c] = combo;
      return boxes[a] && boxes[b] && boxes[c] &&
        boxes[a].type === boxes[b].type &&
        boxes[a].type === boxes[c].type;
    });

    if (winnerCombo) {
      const symbol = boxes[winnerCombo[0]].type;
      const cpuType = playerMark === "X" ? CircleSvg : CrossSvg;
      const isCpuWinner = symbol === cpuType;

      setGameOver(true);
      setWinner(isCpuWinner ? "CPU" : "YOU");

      if (isCpuWinner) setCpu((prev) => prev + 1);
      else setPlayer((prev) => prev + 1);

      return;
    }

    if (boxes.every((b) => b !== null)) {
      setGameOver(true);
      setWinner("TIE");
      setTies((prev) => prev + 1);
    }
  }, [boxes]);

  return (
    <>
      <header className="header-game">
        <div className="xoLogo">
          <Link href="/">
            <CrossSvg />
            <CircleSvg />
          </Link>
        </div>
        <div className="turn">
          <p>{isUserTurn ? `${playerMark} TURN` : `${cpuMark} TURN`}</p>
        </div>
        <div onClick={resetGame} className="restart-btn">
          <RestartSvg />
        </div>
      </header>

      <div className="game-area">
        <div className="game-boxes-area">
          {boxes.map((box, i) => (
            <div
              key={i}
              className={`box ${isUserTurn && !box ? (playerMark === "X" ? "hover-x" : "hover-o") : ""}`}
              onClick={() => handleBox(i)}
            >
              {box}
            </div>
          ))}
        </div>

        <div className="score-area">
          <div className={selectedMark === "X" ? "player-score-section" : "cpu-score-section"}>
            <h3>{selectedMark} (YOU)</h3>
            <p className="player-score">{player}</p>
          </div>
          <div className="ties-score-section">
            <h3>TIES</h3>
            <p className="player-score">{ties}</p>
          </div>
          <div className={selectedMark === "X" ? "cpu-score-section" : "player-score-section"}>
            <h3>{cpuMark} (CPU)</h3>
            <p className="player-score">{cpu}</p>
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              {winner === "YOU" && (
                <div className="winnerScreenText">
                  <h5>YOU WON!</h5>
                  <div className="takesTheRoundPlayer">
                    {playerMark === "X" ? <CrossSvg /> : <CircleSvg />}
                    <h4 style={{ color: playerMark === "X" ? "#31C3BD" : "#F2B137" }}>
                      TAKES THE ROUND
                    </h4>
                  </div>
                </div>
              )}
              {winner === "CPU" && (
                <div className="winnerScreenText">
                  <h5>OH NO, YOU LOST…</h5>
                  <div className="takesTheRoundCpu">
                    {playerMark === "X" ? <CircleSvg /> : <CrossSvg />}
                    <h4 style={{ color: playerMark === "X" ? "#F2B137" : "#31C3BD" }}>
                      TAKES THE ROUND
                    </h4>
                  </div>
                </div>
              )}
              {winner === "TIE" && <div className="rounTiedScreen"><h5>ROUND TIED</h5></div>}
              <div className="modal-buttons">
                <button onClick={() => (window.location.hash = "/choice-page")} className="quit-btn">
                  QUIT
                </button>
                <button onClick={resetGame} className="next-round-btn">
                  NEXT ROUND
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}