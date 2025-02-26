import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios to make HTTP requests
import "./signIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // For error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors

    // Password match validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Password strength validation (Optional but recommended)
    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    try {
      // Send the signup request to the backend
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        phone,
        password,
      });

      // Handle successful signup
      alert("Sign-up successful! Redirecting to login...");
      navigate("/login"); // Redirect to login page after successful sign-up
    } catch (err) {
      // Handle error from the backend (e.g., email already exists)
      console.error(err); // Log the error for debugging
      setError(err.response?.data?.message || "Sign-up failed. Please try again.");
    }
  };

  return (
    <div className="signin-page">
      <h1 className="signin-title">Sign Up</h1>
      <form onSubmit={handleSubmit} className="signin-form">
        {error && <p className="error-message">{error}</p>} {/* Display error message */}

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
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="tel"
            id="phone"
            className="form-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="Enter your phone number"
            pattern="[0-9]{10}"
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
            placeholder="Create a password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            className="form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm your password"
          />
        </div>

        <button type="submit" className="signin-btn">Sign Up</button>

        <p className="signin-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
