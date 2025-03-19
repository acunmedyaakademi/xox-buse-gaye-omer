import { Link } from "../Router";

export default function StartPage() {
  return (
    <div className="loginSection">
      <Link href="/login" className="loginBtn">
        Login
      </Link>
      <Link href="/signup" className="loginBtn">
        Sign Up
      </Link>
    </div>
  );
}
