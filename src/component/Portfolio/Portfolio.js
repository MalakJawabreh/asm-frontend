import React, { useEffect, useState } from "react";
import "./Portfolio.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";

const Portfolio = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLastThree = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/posts/getall`);

        const sorted = res.data.posts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);

        setLatestPosts(sorted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLastThree();
  }, []);

  const openModal = (post) => {
    setSelectedPost(post);
    setSelectedImageIndex(0);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setSelectedImageIndex(0);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % selectedPost.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex(
      (prev) =>
        (prev - 1 + selectedPost.images.length) % selectedPost.images.length
    );
  };

  return (
    <div className="portfolio-section">
      <div className="portfolio-title">
        <h1>Portfolio</h1>
        <p>
          Click “Show More” to explore our full gallery and discover more of our
          work.
        </p>
      </div>

      {/* Latest 3 posts */}
      <div className="portfolio-wrapper">
        <div className="portfolio-grid">
          {latestPosts.map((post) => (
            <div
              className="portfolio-card"
              key={post._id}
              onClick={() => openModal(post)}
            >
              <div className="post-image-container">
                <img src={post.images[0]} alt={post.title} />
                <span
                  className="open-modal-icon"
                  onClick={() => openModal(post)}
                  title="View images"
                >
                  🔎
                </span>
              </div>{" "}
              <h3>{post.title.replace(" Projects", "")}</h3>
              <p className="portfolio-desc">{post.description}</p>
              <p className="portfolio-date">
                Date:{" "}
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>

        {/* زر الشو مور */}
        <button className="show-more-btn" onClick={() => navigate("/posts")}>
          Show More
        </button>
      </div>

      {/* Modal for Image Gallery */}
      {selectedPost && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              X
            </button>
            <p>{selectedPost.description}</p>

            <img
              src={selectedPost.images[selectedImageIndex]}
              alt={selectedPost.title}
            />

            <div className="modal-navigation">
              <button onClick={prevImage}>◀</button>
              <button onClick={nextImage}>▶</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
