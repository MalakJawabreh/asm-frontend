import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact">
      {/* Contact Header */}
      <div className="Contact-title">
        <h1>Contact</h1>
        <p>Need Help? Contact Us</p>
      </div>

      <section className="contact-section">
        <div className="contact-left">
          <div className="contact-row">
            <div className="contact-card">
              <div className="icon-title">
                <i className="fa-solid fa-location-dot"></i>
                <h3>Address</h3>
              </div>
              <p>METRO DETROIT , MICHIGAN</p>
            </div>

            <div className="contact-card">
              <div className="icon-title">
                <i className="fa-solid fa-envelope"></i>
                <h3>Email</h3>
              </div>
              <p>Amjad375@hotmail.com</p>
            </div>

            <div className="contact-card">
              <div className="icon-title">
                <i className="fa-solid fa-phone"></i>
                <h3>Phone</h3>
              </div>
              <p>(313) 485 - 4990</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
