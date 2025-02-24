import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation
import "./Profile.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [updatedUserData, setUpdatedUserData] = useState(userData);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data); // Assuming response contains user data
        setUpdatedUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false); // Hide loading indicator after data is fetched
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUpdatedUserData({
      ...updatedUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/profile",
        updatedUserData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserData(updatedUserData);
      setSuccess("Profile updated successfully!");
    } catch (error) {
      setError("Failed to update profile.");
      console.error("Error updating profile:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>

      {loading ? (
        <p>Loading...</p> // Show loading message while fetching data
      ) : (
        <>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={updatedUserData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={updatedUserData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={updatedUserData.phone}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="update-btn">
              Update Profile
            </button>
          </form>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
