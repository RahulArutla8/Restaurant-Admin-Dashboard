import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo">Restaurant Admin</div>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">Menu</Link>
          <Link to="/orders" className="navbar-link">Orders</Link>
          <Link to="/best-dishes" className="navbar-link">Best Dishes</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
