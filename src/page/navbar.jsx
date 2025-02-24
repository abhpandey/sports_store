import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  // Check if the user is logged in by checking the token in localStorage
  const isLoggedIn = localStorage.getItem("token");

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {/* Common navbar items */}
        {["Home", "About", "Product", "Cart"].map((item) => (
          <li key={item} className="navbar-item">
            <Link to={`/${item.toLowerCase()}`} className="navbar-link">
              {item}
            </Link>
          </li>
        ))}

        {/* Show Login/SignIn if user is not logged in */}
        {!isLoggedIn && (
          <>
            <li key="login" className="navbar-item">
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            </li>
            <li key="signin" className="navbar-item">
              <Link to="/signin" className="navbar-link">
                SignIn
              </Link>
            </li>
          </>
        )}

        {/* Show Logout button if user is logged in */}
        {isLoggedIn && (
          <li key="logout" className="navbar-item">
            <button onClick={handleLogout} className="navbar-link logout-btn">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
