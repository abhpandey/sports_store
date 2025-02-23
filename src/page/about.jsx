import React from "react";
import "./about.css"; // Importing CSS for the About page (optional)

const About = () => {
  return (
    <div className="about-container">
      <h1>Welcome to Ultimate Sports Store</h1>
      <p>
        Your one-stop destination for high-quality sports gear, apparel, and
        accessories! We are passionate about providing athletes and sports
        enthusiasts with top-tier products that enhance performance and comfort.
      </p>

      <section>
        <h2>Our Mission</h2>
        <p>
          At Sports Store, our mission is to <strong>empower athletes of all levels</strong> by offering premium sports
          equipment and accessories. We strive to inspire a{" "}
          <strong>healthy and active lifestyle</strong> while ensuring that every customer finds exactly what they need.
        </p>
      </section>

      <section>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>✅ <strong>Wide Range of Products</strong> – From football and basketball to fitness and outdoor gear, we have it all.</li>
          <li>✅ <strong>Quality Assurance</strong> – We only offer products from trusted brands that meet industry standards.</li>
          <li>✅ <strong>Customer Satisfaction</strong> – Your happiness is our priority! We provide excellent customer support and hassle-free returns.</li>
          <li>✅ <strong>Affordable Prices</strong> – Get the best sports equipment without breaking the bank.</li>
        </ul>
      </section>

      <section>
        <h2>Meet The Creator</h2>
        <p>
          The website as of <strong>NOW</strong> is being handeled completely by one persone which is me Abhishek Pandey and have 
          collected a wide range of sports products that many sports enthusiasts might need.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          📍 <strong>Location:</strong> kathmandu,softwarica clz<br />
          📧 <strong>Email:</strong> support@sportsstore.com<br />
          📞 <strong>Phone:</strong> +123 456 7890
        </p>
      </section>
    </div>
  );
};

export default About;
