import { createContext, useContext, useState, useEffect } from "react";

const PageContext = createContext(null);

export function usePage() {
  return useContext(PageContext);
}

export default function Router({ routes, children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    function handleRouteChange() {
      console.log("Sayfa değişti:", window.location.pathname); // Debug için
      setCurrentPath(window.location.pathname);
    }

    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
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
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  return (
    <a className="link" href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}