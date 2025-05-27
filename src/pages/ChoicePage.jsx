import { useContext, useState } from "react";
import { Link } from '../Router'
import { GameContext } from "./GameContext";
import { CrossSvg, CircleSvg } from "../Svg";
import "../App.css";

export default function ChoicePage() {
  const { playerMark, setPlayerMark, cpuMark, setCpuMark } = useContext(GameContext);
  const [selectionError, setSelectionError] = useState(false); // seçim yapılmadı uyarısı

  const handlePlayerChoice = (mark) => {
    setPlayerMark(mark);
    setCpuMark(mark === "X" ? "O" : "X");

    localStorage.playerMark = mark;
    localStorage.cpuMark = mark === "X" ? "O" : "X";

    console.log("Seçilen işaret:", mark);
    console.log("CPU işareti:", mark === "X" ? "O" : "X");
  };

  return (
    <>
      <header className="header">
        <div className="xoLogo">
          <Link href="/">
            <CrossSvg />
            <CircleSvg />
          </Link>
        </div>
      </header>
      <div className="choice-page">
        <div className="choice-content">
          <h1>PICK PLAYER 1’S MARK</h1>
          <div className="choice-area">
            <button
              className={`choice-button ${playerMark === "X" ? "active" : ""}`}
              onClick={() => handlePlayerChoice("X")}><CrossSvg /></button>
            <button
              className={`choice-button ${playerMark === "O" ? "active" : ""}`}
              onClick={() => handlePlayerChoice("O")}><CircleSvg /></button>
          </div>
          <p>REMEMBER : X GOES FIRST</p>
        </div>
        <div className="choice-btns">
          <button className="new-game-cpu"><Link
            href={playerMark ? "/game" : "#"}
            onClick={(e) => {
              if (!playerMark) {
                e.preventDefault();
                setSelectionError(true);
              }
            }}>
            NEW GAME (VS CPU)
          </Link></button>
          {selectionError && (
            <p className="error-text">Please pick a mark to start the game.</p>
          )}
        </div>
      </div>
    </>
  );
}
