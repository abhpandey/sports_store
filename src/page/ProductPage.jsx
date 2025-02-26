import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "./productPage.css"; // Import the CSS file

const ProductPage = () => {
  const { addToCart } = useCart();
  const [popupVisible, setPopupVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample products with image URLs
  const products = [
    { id: 1, name: "Boxing-Gloves", price: 1000, image: "public/Images/boxing-gloves-booster-1-600x600.jpg" },
    { id: 2, name: "Hand Wrap", price: 500, image: "public/Images/camo-wrap-USI-3-600x600.jpg" },
    { id: 3, name: "Coach Vest", price: 1300, image: "public/Images/coach-vest-1-600x600.jpg" },
    { id: 4, name: "GoalKeepers-Gloves", price: 1500, image: "public/Images/umbro-formation-1-600x600.jpg" },
    { id: 5, name: "Boots(Jujulani)", price: 4500, image: "public/Images/jujulani-boots-1-600x600.jpg" },
    { id: 6, name: "Shin-Pads", price: 350, image: "public/Images/Football-shin-pads-italia-1-600x600.jpg" },
    { id: 7, name: "Grip-Socks", price: 225, image: "public/Images/Photo-from-Samyek-Shakya-5-300x300.jpg" },
    { id: 8, name: "Football", price: 2250, image: "public/Images/Stealth-pro-3-600x600.jpg" },
    { id: 9, name: "Football", price: 2250, image: "public/Images/football-rubber-mounted-country-3-600x600.jpg" },
    { id: 10, name: "Jujulani String bag", price: 2000, image: "public/Images/string-bag-1-600x600.jpg" },
    { id: 11, name: "Badminton Racket", price: 5540, image: "public/Images/kawasaki-firefox-3370-3-600x600.jpg" },
    { id: 12, name: "Batminton Vixen Shuttlecock", price: 1115, image: "public/Images/badminton-shuttle-cock-vixen-feather-1-600x600.jpg" },
    { id: 13, name: "Mikasa BasketBall", price: 5520, image: "public/Images/Mikasa-power-jam.jpg" },
    { id: 14, name: "Dart Board", price: 160, image: "public/Images/dart-board-vixen-16-premium-1-1-600x600.jpg" },
    { id: 15, name: "Frisbee", price: 80, image: "public/Images/frisbee-vixen-1-600x600.jpg" },
    { id: 16, name: "Cricket Full Kit", price: 15000, image: "public/Images/eco-combo-kit-2.jpg" },
    { id: 17, name: "Cricket Helmet", price: 2000, image: "public/Images/CRICKET-HELMET-MASTER-2-1-600x600.jpg" },
    { id: 18, name: "Vixen Table Tennis Bat", price: 1350, image: "public/Images/all-round-dragon-1-600x600.jpg" },
    { id: 19, name: "TT table", price: 15000, image: "public/Images/tt board.jpg" },
    { id: 20, name: "Futsal Boots", price: 1400, image: "public/Images/vector-x-fizer-5-1-600x600.jpg" },
  ];

  // Function to handle adding to cart and showing popup
  const handleAddToCart = (product) => {
    addToCart(product); // Add item to cart
    setPopupVisible(true); // Show popup

    // Hide popup after 2 seconds
    setTimeout(() => {
      setPopupVisible(false);
    }, 2000);
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1 className="product-title">Products</h1>

      {/* Search Bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Popup Message */}
      {popupVisible && <div className="popup-message">✅ Successfully Added to Cart!</div>}

      <div className="product-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">₹{product.price}</p>
              </div>
              <button className="product-btn" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="no-results">No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
