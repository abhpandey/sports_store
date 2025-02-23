import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./page/navbar";
import Home from "./page/home";
import About from "./page/about";
import Login from "./page/Login";
import SignIn from "./page/signin";
import ProductPage from "./page/ProductPage";
import CartPage from "./page/CartPage";
import { CartProvider } from "./context/CartContext";
import Footer from "./components/Footer"; // Import Footer component

function App() {
  return (
    <CartProvider>
      <Router>
        <MainContent />
      </Router>
    </CartProvider>
  );
}

function MainContent() {
  const location = useLocation();

  // Check if the current path is either "/login" or "/signin"
  const showFooter = !["/login", "/signin"].includes(location.pathname);

  return (
    <>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
      {showFooter && <Footer />} {/* Render Footer based on the condition */}
    </>
  );
}

export default App;
