import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <Link className="navbar-brand" to="/">
      Navbar
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse ml-auto">
      <div className="navbar-nav">
        <NavLink className="nav-item nav-link" to="/store/items">
          Home
        </NavLink>
        <NavLink className="nav-item nav-link" to="/about">
          About
        </NavLink>
        <NavLink className="nav-item nav-link" to="/contact">
          Contact
        </NavLink>
      </div>
    </div>
  </nav>
);
export default NavBar;
