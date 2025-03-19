import { useEffect, useState, createContext } from "react";
import "./App.css";
import { Link, usePage } from "./Router";
import { supabase } from "./main";
import { CircleSvg, CrossSvg } from "./Svg";

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
    <UserContext.Provider value={authUser}>
      <div className="container">
        <header className="header">
          <div className="xoLogo">
            <Link href="/">
              <CrossSvg />
              <CircleSvg />
            </Link>
          </div>
        </header>
        {page.component}
      </div>
    </UserContext.Provider>
  );
}

export default App;
