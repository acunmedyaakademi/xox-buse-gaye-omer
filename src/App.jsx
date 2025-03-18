import { useEffect, useState, createContext } from "react";
import "./App.css";
import { Link, usePage } from "./Router";
import { supabase } from "./main";
import { GameProvider } from "./pages/GameContext";

export const UserContext = createContext(null);

function App() {
  const page = usePage();
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);

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
      <UserContext.Provider value={authUser}>
        <div className="container">
          <header className="header">
            <h1>
              <Link href="/">Game</Link>
            </h1>
            <div className="loginSection">
              <Link href="/login" className="btn btn-ghost">
                Giriş
              </Link>
              {/* <Link href="/giris" className="btn">Kayıt Ol</Link> */}
            </div>
          </header>
          {page.component}
        </div>
      </UserContext.Provider>
    </GameProvider>
  );
}

export default App;
