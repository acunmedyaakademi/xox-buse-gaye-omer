import { useState, useEffect, Fragment } from "react";
import { getPage } from "./helper";

let page;

export function usePage() {
  return page;
}

export default function Router({ children, routes }) {
  const [url, setUrl] = useState(location.href.replace(location.origin, ''));

  useEffect(() => {
    window.addEventListener('popstate', handleRouteChange);

    window.addEventListener('routeChange', handleRouteChange);

    function handleRouteChange() {
      setUrl(location.href.replace(location.origin, ''));
    }
  }, []);

  page = getPage(routes, url);

  return <Fragment key={url}>{children}</Fragment>
}

const routeChange = new Event('routeChange');

export function Link({ href, children, className }) {
  function handleClick(e) {
    e.preventDefault();
    //e.target.getAttribute('href')
    history.pushState(null, '', href);
    window.dispatchEvent(routeChange);
  }

  return (
    <a href={href} onClick={handleClick} className={className}>{children}</a>
  )
}