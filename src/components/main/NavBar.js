import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <Link to="/" className="navbar-brand">
      Mini Shop
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <NavLink className="nav-item nav-link" to="/store/items">
            Home <span className="sr-only">(current)</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-item nav-link" to="/checkout">
            Checkout
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);
export default NavBar;
