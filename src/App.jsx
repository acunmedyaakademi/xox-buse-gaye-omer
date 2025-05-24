import { useEffect, useState, createContext } from "react";
import "./App.css";
import { Link, usePage } from "./Router";
import { supabase } from "./main";
import { GameProvider } from "./pages/GameContext";
import { CircleSvg, CrossSvg } from "./Svg";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserContext = createContext(null);

function App() {
  const page = usePage(); // Burada artık `undefined` olmamalı!
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    console.log("Aktif Sayfa:", page.path); // 🚀 Debug için buraya ekleyelim!
  }, [page]);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        setAuthUser(session.user.user_metadata);
      }
      if (event === "SIGNED_OUT") {
        setAuthUser(null);
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <GameProvider>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <UserContext.Provider value={authUser}>
        <div className="container">
          {page.component}
        </div>
      </UserContext.Provider>
    </GameProvider>
  );
}

export default App;
