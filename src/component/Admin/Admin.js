import React, { useState } from "react";
import axios from "axios";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";

function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("adminToken", token);

      setSuccess("Login successful!");
      navigate("/create-post");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) return setUpdateMessage("Unauthorized");

    try {
      const res = await axios.put(
        `${API_URL}/api/auth/update`,
        {
          username: newUsername,
          password: newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUpdateMessage(res.data.message); // لو الـ API بيرجع رسالة

      setUpdateMessage("Admin info updated successfully!");
      setShowUpdateModal(false);
    } catch (err) {
      setUpdateMessage(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Log In</button>

        <p
          className="change-info-link"
          onClick={() => setShowUpdateModal(true)}
          style={{
            cursor: "pointer",
            color: "#122079;",
            marginTop: "10px",
            fontSize: "13px",
          }}
        >
          Do you want update the username or password?
        </p>
      </form>

      {showUpdateModal && (
        <div
          className="update-modal-overlay"
          onClick={() => setShowUpdateModal(false)}
        >
          <div
            className="update-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setShowUpdateModal(false)}
            >
              X
            </button>

            <h3>Update Informations</h3>

            <input
              type="text"
              placeholder="New Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button className="ok-btn" onClick={handleUpdate}>
              OK
            </button>

            {updateMessage && <p className="message">{updateMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
