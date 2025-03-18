import { createContext, useState, useEffect } from "react";

export const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [playerMark, setPlayerMark] = useState(null);

  return (
    <GameContext.Provider
      value={{ playerMark, setPlayerMark }}>
      {children}
    </GameContext.Provider>
  );
}