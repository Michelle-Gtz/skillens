import { Link } from "react-router";
export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <p>SKILLENS</p>
      </Link>
      <Link to="/upload" className="primary-button w-fit">
        Upload CV
      </Link>
    </nav>
  );
}
