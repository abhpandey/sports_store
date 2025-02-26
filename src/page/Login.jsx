import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "./Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); 
        alert("Login successful!");
        navigate("/"); 
      }
    } catch (error) {
      alert("Invalid email or password. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-page">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
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
