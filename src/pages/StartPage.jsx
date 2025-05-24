import { Link } from "../Router";
import "../App.css";
import { CrossSvg, CircleSvg } from "../Svg";

export default function StartPage() {
  return (
    <>
      <header className="header">
        <div className="xoLogo">
          <Link href="/">
            <CrossSvg />
            <CircleSvg />
          </Link>
        </div>
      </header>
      <div className="loginSection">
        <Link href="/login" className="loginBtn">
          Login
        </Link>
        <Link href="/signup" className="loginBtn">
          Sign Up
        </Link>
      </div>
    </>
  );
}
