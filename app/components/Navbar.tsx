import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <img
          src="/images/skillens-logo.png"
          alt="Skillens"
          className="h-8 w-auto md:h-12 lg:h-12"
        />
      </Link>

      <Link
        to="/upload"
        className="primary-button w-fit transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(124,140,255,0.25)]"
      >
        Upload CV
      </Link>
    </nav>
  );
}
