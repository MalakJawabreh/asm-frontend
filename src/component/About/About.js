import React from "react";
import "./About.css";

function About() {
  return (
    <section className="about-section">
      {/* Section Header */}
      <div className="about-header">
        <h1>ABOUT</h1>
        <p>Learn more about who we are and what we do</p>
      </div>

      {/* Company Info */}
      <div className="about-company">
        <div className="about-image">
          <img src="/about.jpg" alt="ASM Design project" />
        </div>

        <div className="about-text">
          <h2>About ASM Design</h2>
          <p>
            ASM Design is a remodeling and construction company built on
            precision, creativity, and trust. We specialize in transforming
            spaces into elegant, functional designs that reflect your lifestyle.
          </p>

          <div className="features">
            <div className="feature-item">
              <i className="fas fa-hammer"></i>
              <div>
                <h4>High-Quality Craftsmanship</h4>
                <p>
                  Delivering superior workmanship that exceeds expectations.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <i className="fas fa-home"></i>
              <div>
                <h4>Innovative & Functional Designs</h4>
                <p>
                  Transforming every space into a perfect blend of style and
                  comfort.
                </p>
              </div>
            </div>
          </div>

          <div className="founder-info">
            <div className="founder-header">
              <img src="/amjad2.jpeg" alt="Amjad Hamadneh" />
              <h3>Amjad Hamadna</h3>
            </div>
            <p>
              Founder & Lead Designer of ASM Design, has over 5 years of
              experience in remodeling and construction, recognized for his
              expertise, precision, and high-quality workmanship.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
