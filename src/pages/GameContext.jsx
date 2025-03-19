import { createContext, useState, useEffect } from "react";

export const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [playerMark, setPlayerMark] = useState(null); // kullanıcının seçtiği simge
  const [cpuMark, setCpuMark] = useState(null); // cpu'ya kalan simge

  return (
    <GameContext.Provider
      value={{ playerMark, setPlayerMark, cpuMark, setCpuMark }}>
      {children}
    </GameContext.Provider>
  );
}