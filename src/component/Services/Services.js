import React from "react";
import "./Services.css";
import {
  FaTools,
  FaBolt,
  FaPaintRoller,
  FaHammer,
  FaWater,
  FaUtensils,
} from "react-icons/fa";

const Services = () => {
  const services = [
    {
      title: "Kitchen Remodeling",
      desc: "Modern kitchen redesigns and layout improvements.",
      icon: <FaUtensils />,
      image: "/kitchen.png",
    },
    {
      title: "Electrical Services",
      desc: "Safe, professional electrical installation and rewiring.",
      icon: <FaBolt />,
      image: "/elec.png",
    },
    {
      title: "Plumbing Services",
      desc: "Reliable plumbing repairs, installations, and upgrades.",
      icon: <FaWater />,
      image: "/plump.png",
    },
    {
      title: "Flooring",
      desc: "Tile, laminate, and hardwood installation.",
      icon: <FaTools />,
      image: "/floor.png",
    },
    {
      title: "Painting & Finishing",
      desc: "Interior & exterior painting with clean finishing.",
      icon: <FaPaintRoller />,
      image: "/paint.png",
    },
    {
      title: "Carpentry",
      desc: "Custom cabinetry, trims, doors, and woodwork.",
      icon: <FaHammer />,
      image: "/wood.png",
    },
  ];

  return (
    <div className="services-section">
      {/* Title */}
      <h2 className="services-title">Services</h2>

      {/* Moving Slider */}
      <div className="services-slider-wrapper">
        <div className="services-slider">
          {services.concat(services).map((service, index) => (
            <div className="slide-item" key={index}>
              <span className="slide-icon">{service.icon}</span>
              <span className="slide-text">{service.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Cards */}
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card-img" key={index}>
            <img src={service.image} alt={service.title} />
            <div className="overlay">
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
