import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import "./SignIn.css"; // CSS file for styling

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook to navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Password match validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // Update the URL to point to your backend's signup endpoint
      const response = await fetch("http://localhost:5000/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, password }),
      });

      const data = await response.json();

      // Handle successful sign-up
      if (response.ok) {
        alert("Sign-up successful! Redirecting to login...");
        navigate("/login"); // Redirect to login page
      } else {
        setError(data.error || "Signup failed. Try again.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      console.error("Signup Error:", err);
    }
  };

  return (
    <div className="signin-page">
      <h1 className="signin-title">Sign Up</h1>
      <form onSubmit={handleSubmit} className="signin-form">
        {/* Display error message if there's an error */}
        {error && <p className="error-message">{error}</p>}

        {/* Email input field */}
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

        {/* Phone number input field */}
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

        {/* Password input field */}
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

        {/* Confirm password input field */}
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

        {/* Submit button */}
        <button type="submit" className="signin-btn">Sign Up</button>

        {/* Link to login page if already have an account */}
        <p className="signin-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
