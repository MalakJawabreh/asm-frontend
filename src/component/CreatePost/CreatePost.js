import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css"; // ستايل للفورم
import { API_URL } from "../../config/api";

function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // تحقق من وجود توكن
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admins"); // لو ما فيه توكن يرجع للـ login
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("adminToken");
    if (!token) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    images.forEach((img) => formData.append("images", img));

    try {
      const res = await axios.post(`${API_URL}/api/posts/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data); // أو استخدميه بأي طريقة

      setMessage("Post created successfully!");
      setTitle("");
      setDescription("");
      setImages([]);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error creating post");
    }
  };

  return (
    <div className="create-post-container">
      <form className="create-post-form" onSubmit={handleSubmit}>
        <h2>Create New Post</h2>
        {message && <p className="message">{message}</p>}

        <select
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        >
          <option value="">Select Project Type</option>
          <option value="Kitchen Remodeling Projects">
            Kitchen Remodeling Projects
          </option>
          <option value="Flooring Projects">Flooring Projects</option>
          <option value="Electrical Projects">Electrical Projects</option>
          <option value="Plumbing Projects">Plumbing Projects</option>
          <option value="Painting & Finishing Projects">
            Painting & Finishing Projects
          </option>
          <option value="Carpentry Projects">Carpentry Projects</option>
        </select>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        <button type="submit">Create Post</button>
        <button className="manage" onClick={() => navigate("/admin/posts")}>
          Manage Posts
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
