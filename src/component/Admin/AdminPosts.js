import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AdminPosts.css";
import { API_URL } from "../../config/api";

function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // ⭐ التاريخ المختار للفلاتر

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/posts/getall`);
        setPosts(res.data.posts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  const confirmDelete = (id) => {
    setSelectedPostId(id);
    setShowModal(true);
  };

  const deletePost = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) return alert("Unauthorized");

    try {
      await axios.delete(`${API_URL}/api/posts/delete/${selectedPostId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts((prev) => prev.filter((p) => p._id !== selectedPostId));
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Error deleting post");
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (!selectedDate) return true;

    const postDate = new Date(post.createdAt);
    const selected = new Date(selectedDate);

    postDate.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    return postDate.getTime() === selected.getTime();
  });

  return (
    <div className="admin-posts-container">
      <h1>Manage Posts</h1>

      {/* ⭐ مربع الفلترة */}
      <div className="filter-box">
        <div className="date-input-wrapper">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Choose a date"
            className="date-picker-input"
          />
        </div>

        <button className="clear-filter" onClick={() => setSelectedDate(null)}>
          Clear Filter
        </button>
      </div>

      {/* ⭐ عرض البوستات بعد الفلترة */}
      <div className="posts-grid">
        {filteredPosts.map((post) => (
          <div key={post._id} className="admin-post-card">
            <h3 className="admin-post-title">{post.title}</h3>
            <p className="admin-post-desc">{post.description}</p>

            <button
              className="delete-btn"
              onClick={() => confirmDelete(post._id)}
            >
              Delete
            </button>

            <p className="date-label">
              {new Date(post.createdAt).toLocaleDateString("en-GB", {
                timeZone: "UTC",
              })}
            </p>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      {showModal && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Delete Post?</h3>
            <p>Are you sure you want to delete this post?</p>

            <div className="popup-buttons">
              <button className="confirm" onClick={deletePost}>
                Yes, Delete
              </button>
              <button className="cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPosts;
