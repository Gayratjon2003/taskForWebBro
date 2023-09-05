import React from "react";
import { Link } from "react-router-dom";
import { routes } from "./constants";
const Header = () => {
  return (
    <header className="header">
      <div className="container">
      <nav className="navbar">
        <ul className="ul">
          <li>
            <Link to={routes.HOME}>Home</Link>
          </li>
          <li>
            <Link to={routes.HOME}>Products</Link>
          </li>
          <li>
            <Link to={routes.CART}>
              <i className="bx bx-cart"></i>
            </Link>
          </li>
        </ul>
      </nav>
      </div>
    </header>
  );
};

export default Header;
