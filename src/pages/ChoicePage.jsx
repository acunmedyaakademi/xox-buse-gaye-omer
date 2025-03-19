import { useContext } from "react";
import { Link } from '../Router'
import { GameContext } from "./GameContext";
import { CrossSvg, CircleSvg } from "../Svg";

export default function ChoicePage() {
  const { playerMark, setPlayerMark, cpuMark, setCpuMark } = useContext(GameContext);

  const handlePlayerChoice = (mark) => {
    setPlayerMark(mark);
    setCpuMark(mark === "X" ? "O" : "X");

    localStorage.playerMark = mark;
    localStorage.cpuMark = mark === "X" ? "O" : "X";

    console.log("Seçilen işaret:", mark);
    console.log("CPU işareti:", mark === "X" ? "O" : "X");
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
