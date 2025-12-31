import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <img src="/final1.png" alt="AMS Design Logo" />
        </div>

        {/* Nav Menu */}
        <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <Link className="nav-link" to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link
            className="nav-link"
            to="/#about"
            state={{ scrollTo: "about" }}
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>

          <Link
            className="nav-link"
            to="/#services"
            state={{ scrollTo: "services" }}
            onClick={() => setMenuOpen(false)}
          >
            Services
          </Link>

          <Link
            className="nav-link"
            to="/#portfolio"
            state={{ scrollTo: "portfolio" }}
            onClick={() => setMenuOpen(false)}
          >
            Portfolio
          </Link>

          <Link
            className="nav-link"
            to="/#contact"
            state={{ scrollTo: "contact" }}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>

        {/* Contact Button (Desktop) */}
        <Link
          to="/#contact"
          state={{ scrollTo: "contact" }}
          className="contact-desktop"
        >
          <button className="contact-btn">Contact Now</button>
        </Link>

        {/* Hamburger */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
}
