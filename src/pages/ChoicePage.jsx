import { useContext } from "react";
import { Link } from '../Router'
import { GameContext } from "./GameContext";
import { CrossSvg, CircleSvg } from "../Svg";

export default function ChoicePage() {
  const { playerMark, setPlayerMark } = useContext(GameContext);

  const handlePlayerChoice = (mark) => {
    setPlayerMark(mark);
    localStorage.playerMark = mark;
    console.log("Seçilen işaret:", mark);
  };

  return (
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
        <button className="new-game-cpu"><Link href="/game">NEW GAME (VS CPU)</Link></button>
      </div>
    </div>
  );
}
