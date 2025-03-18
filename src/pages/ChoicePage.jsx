import { useState, useContext, useEffect } from "react";
import { Link, usePage } from '../Router'
import { GameContext } from "./GameContext";

export default function ChoicePage() {
  const { playerMark, setPlayerMark } = useContext(GameContext);

  const handlePlayerChoice = (mark) => {
    setPlayerMark(mark);
    localStorage.playerMark = mark;
    console.log("Seçilen işaret:", mark);
  };

  return (
    <div className="choice-content">
      <h1>PICK PLAYER 1’S MARK</h1>
      <div className="choice-buttons">
        <button
          className={`choice-button ${playerMark === "X" ? "active" : ""}`}
          onClick={() => handlePlayerChoice("X")}>X</button>
        <button
          className={`choice-button ${playerMark === "O" ? "active" : ""}`}
          onClick={() => handlePlayerChoice("O")}>O</button>
      </div>
      <p>REMEMBER : X GOES FIRST</p>
      <p>Selected: {playerMark}</p>
      <button><Link href="/game">NEW GAME (VS CPU)</Link></button>
    </div>
  );
}
