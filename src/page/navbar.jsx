import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {["Home", "About", "Product", "Login", "SignIn", "Cart"].map((item) => (
          <li key={item} className="navbar-item">
            <Link
              to={`/${item.toLowerCase()}`}
              className="navbar-link"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
