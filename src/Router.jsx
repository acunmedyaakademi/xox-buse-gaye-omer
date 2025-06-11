import { createContext, useContext, useState, useEffect } from "react";

const PageContext = createContext(null);

export function usePage() {
  return useContext(PageContext);
}

export default function Router({ routes, children }) {
  // Hash URL'den path'i almak için yardımcı fonksiyon
  const getHashPath = () => {
    const hash = window.location.hash;
    // # işaretinden sonraki kısmı al, yoksa "/" döndür
    return hash ? hash.substring(1) : "/";
  };

  const [currentPath, setCurrentPath] = useState(getHashPath());

  useEffect(() => {
    function handleRouteChange() {
      console.log("Sayfa değişti:", getHashPath()); // Debug için
      setCurrentPath(getHashPath());
    }

    // Hash değişikliğini dinle
    window.addEventListener("hashchange", handleRouteChange);
    return () => window.removeEventListener("hashchange", handleRouteChange);
  }, []);

  const activePage = routes.find((route) => route.url === currentPath) || routes[0];

  return (
    <PageContext.Provider value={{ path: currentPath, component: activePage.component }}>
      {children}
    </PageContext.Provider>
  );
}

export function Link({ href, children, ...props }) {
  function handleClick(e) {
    e.preventDefault();
    // Hash router için # ile URL değiştir
    window.location.hash = href;
  }

  return (
    <a className="link" href={`#${href}`} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}