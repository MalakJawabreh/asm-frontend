import React from "react";
import "./Footer.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1: About + Newsletter */}
        <div className="footer-column about-newsletter">
          <h3>ASM Design</h3>
          <p>
            We transform spaces into elegant, functional designs that reflect
            your lifestyle.
          </p>
        </div>

        {/* Column 2: Company Links */}
        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li>
              <a href="#about">
                {" "}
                <span style={{ color: "orange", marginRight: "4px" }}>
                  {">"}
                </span>{" "}
                About
              </a>
            </li>
            <li>
              <a href="#services">
                {" "}
                <span style={{ color: "orange", marginRight: "4px" }}>
                  {">"}
                </span>{" "}
                Services
              </a>
            </li>
            <li>
              <a href="#portfolio">
                {" "}
                <span style={{ color: "orange", marginRight: "4px" }}>
                  {">"}
                </span>{" "}
                Portfolio
              </a>
            </li>
            <li>
              <a href="#contact">
                {" "}
                <span style={{ color: "orange", marginRight: "4px" }}>
                  {">"}
                </span>{" "}
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Get in Touch */}
        <div className="footer-column">
          <h3>Get in Touch</h3>
          <ul className="contact-list">
            <li>
              <FaMapMarkerAlt /> METRO DETROIT , MICHIGAN
            </li>
            <li>
              <FaPhoneAlt /> (313) 485 - 4990
            </li>
            <li>
              <FaEnvelope /> Amjad375@hotmail.com
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2025 ASM Design. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
