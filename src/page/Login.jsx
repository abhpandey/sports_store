import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Add axios for making HTTP requests
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // To store error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      // Send a POST request to the backend API
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // If login is successful, store the token in localStorage
      const { token } = response.data;
      localStorage.setItem("token", token);

      alert("Login successful!");
      navigate("/");  // Redirect to home or dashboard page after successful login

    } catch (err) {
      // Handle error from the backend (e.g., invalid credentials)
      setError("Invalid email or password. Please try again.");
      console.error("Login error: ", err);
    }
  };

  return (
    <div className="login-page">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        {error && <p className="error-message">{error}</p>}  {/* Show error message */}

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="login-btn">Login</button>

        <p className="login-link">
          Don't have an account? <a href="/signin">Sign up here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
