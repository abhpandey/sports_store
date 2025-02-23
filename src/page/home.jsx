import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./home.css"; // Add your styles here

const ImageCarousel = () => {
  const images = [
    '/Images/sc-bnr-basketball.png',
    '/Images/sc-bnr-boxing.png',
    '/Images/sc-bnr-cricket.png',
    '/Images/sc-bnr-football.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const intervalId = setInterval(() => {
      changeImage("next");
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  const changeImage = (direction) => {
    if (direction === "next") {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    }
  };

  const handleBuyNowClick = () => {
    navigate("/product"); // Navigate to the product page when Buy Now is clicked
  };

  return (
    <div className="carousel-container">
      {/* Site Name */}
      
        

      <button className="arrow left-arrow" onClick={() => changeImage("prev")}>
        &#8592;
      </button>

      <div
        className="image-container"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Slide images horizontally
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="carousel"
            className="carousel-image"
          />
        ))}
      </div>

      <button className="arrow right-arrow" onClick={() => changeImage("next")}>
        &#8594;
      </button>

      {/* Buy Now Button */}
      <div className="buy-now-container">
        <button className="buy-now-btn" onClick={handleBuyNowClick}>
          Buy Now
        </button>
      </div>

      {/* Additional Content Below */}
      <div className="additional-content">
        <p>Click the Buy Now button to check out our products!!!</p>
      </div>

    </div>
  );
};

export default ImageCarousel;
