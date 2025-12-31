import React, { useState, useEffect } from "react";
import "./Hero.css";

const Hero = () => {
  const images = ["/6.jpg", "/5.jpg", "/4.jpg", "/3.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="hero-slider">
      {/* الصور */}
      <div
        className="slides-container"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            className="slide"
            key={index}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
      </div>

      {/* النص الثابت فوق الصور */}
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Build Your Dream Home With Precision</h1>
          <p>Design | Kitchen | Bath & More</p>
        </div>
      </div>

      {/* Indicators */}
      <div className="hero-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Hero;
