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

  // updatedEmptyBoxes: hamle yapılabilecek kutular
  // updateBoxes: oyun tahtasının güncel hali

  function handleCPUMove(updatedEmptyBoxes, updateBoxes) {

    // eğer boş kutu kalmadıysa veya oyun çoktan bittiyse dön hamle yapma
    if (updatedEmptyBoxes.length === 0 || gameOver) return;

    // Eğer kutular zaten set edildiyse tekrar set etme
    const alreadyFilled = boxes.some((box) => box !== null);
    const alreadySet = updateBoxes.some((box) => box !== null);
    if (!alreadyFilled && alreadySet) return;

    // boş kutular içerisinden rastgele bir tanesini cpu seçer
    const cpuIndex = updatedEmptyBoxes[Math.floor(Math.random() * updatedEmptyBoxes.length)];

    const newBoxes = [...updateBoxes]; // önce güncel oyun tahtası alınır
    newBoxes[cpuIndex] = playerMark === "X" ? <CircleSvg /> : <CrossSvg />;

    // hamle yapılan kutuyu oyun tahtasından çıkarır o kutu artık dolu
    const remainingEmptyBoxes = updatedEmptyBoxes.filter((i) => i !== cpuIndex);

    setBoxes(newBoxes);
    setEmptyBoxes(remainingEmptyBoxes);
  }

  useEffect(() => {
    if (gameOver && winner) {
      const timeout = setTimeout(() => {
        setShowModal(true);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [gameOver, winner]);

  // kullanıcı O, oyun bitmemiş, CPU daha hamle yapmamış ve tüm kutular boş ise
  useEffect(() => {
    if (!isUserTurn && !gameOver && cpuChoices.length === 0 && boxes.every(b => b === null)) {
      // round başındaki ilk CPU hamlesini yap
      setTimeout(() => {
        handleCPUMove([...Array(9).keys()], Array(9).fill(null));
      }, 750);
    }
  }, [isUserTurn, gameOver]);

  // bu fonksiyon oyun tahtasında (boxes) 3'li bir eşleşme olup olmadığını kontrol eder
  // (SVG türüne göre eşleşme kontrolü)
  function checkWinnerFromBoxes(boxes) {
    for (const combo of winnerCombs) {
      const [a, b, c] = combo;
      if (
        boxes[a] && boxes[b] && boxes[c] && boxes[a].type === boxes[b].type && boxes[a].type === boxes[c].type) {
        return boxes[a].type; // CrossSvg veya CircleSvg dönebilir
      }
    }
    return null;
  }

  useEffect(() => {
    if (gameOver) return;

    const winnerType = checkWinnerFromBoxes(boxes);
    if (winnerType) { // kazanan var mı?
      const cpuType = playerMark === "X" ? CircleSvg : CrossSvg; // cpu hangi işareti kullanıyor?
      const isCpu = winnerType === cpuType; // kazanan cpu mu?

      setGameOver(true);
      if (isCpu) {
        setCpu(prev => prev + 1);
        setWinner("CPU");
      } else {
        setPlayer(prev => prev + 1);
        setWinner("YOU");
      }
      setTimeout(() => setShowModal(true), 300);
      return;
    }

    // eğer boş kutu kalmadıysa (beraberlik varsa)
    if (emptyBoxes.length === 0) {
      setGameOver(true);
      setTies(prev => prev + 1);
      setWinner("TIE");
      setTimeout(() => setShowModal(true), 300);
      return;
    }

    // sırayı güncellemek için
    // eğer kullanıcı X ise çift sayılı hamleler onun sırası, O ise tek sayılı hamleler onun sırası
    setIsUserTurn(playerMark === "X"
      ? boxes.filter(Boolean).length % 2 === 0
      : boxes.filter(Boolean).length % 2 === 1);
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
                <button onClick={() => (window.location.href = "/choice-page")} className="quit-btn">
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
