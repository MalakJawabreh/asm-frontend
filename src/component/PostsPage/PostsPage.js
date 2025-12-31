import React, { useEffect, useState } from "react";
import "./PostsPage.css";
import axios from "axios";
import { API_URL } from "../../config/api";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [filterTitle, setFilterTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9; // 3x3 grid

  console.log("API_URL:", API_URL);

  const titles = [
    "Kitchen Remodeling Projects",
    "Flooring Projects",
    "Electrical Projects",
    "Plumbing Projects",
    "Painting & Finishing Projects",
    "Carpentry Projects",
    "All Projects",
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/posts/getall`);
        console.log("Fetched posts:", res.data.posts); // <--- شوف شو يجي

        setPosts(res.data.posts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
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

  // --- Filter posts first ---
  const filteredPosts = posts.filter((post) =>
    filterTitle && filterTitle !== "All Projects"
      ? post.title.trim().toLowerCase() === filterTitle.trim().toLowerCase()
      : true
  );

  // --- Pagination logic ---
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="posts-page">
      <div className="welcome-text">
        <h1>Welcome to Our Showcase!</h1>
        <p>
          Discover our latest projects and designs below. Filter by title to
          find exactly what you’re looking for.
        </p>
      </div>

      <div className="filter-container">
        <select
          value={filterTitle}
          onChange={(e) => {
            setFilterTitle(e.target.value);
            setCurrentPage(1); // reset page when filter changes
          }}
        >
          <option value="" disabled>
            Selected ...
          </option>
          {titles.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
      </div>

      <div className="posts-grid">
        {currentPosts.map((post) => (
          <div
            key={post._id}
            className="post-card"
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
            </div>
            <h2>{post.title.replace(" Projects", "")}</h2>
            <p className="desc">{post.description}</p>
            <p className="post-date">
              Date Created:{" "}
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>

      {/* --- Pagination Controls --- */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀ Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next ▶
          </button>
        </div>
      )}

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
}

export default PostsPage;
