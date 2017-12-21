import React from "react";
import PropTypes from "prop-types";
import { Route, Link } from "react-router-dom";

const propTypes = {};
const defaultProps = {};

const NavLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <li className={match ? "nav-item active" : "nav-item"}>
        <Link to={to} className="nav-link">
          {label}
        </Link>
      </li>
    )}
  />
);

export default function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          React-Blog
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mr-auto">
            <NavLink label="Home" to="/" activeOnlyWhenExact={true} />
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navigation.propTypes = propTypes;
Navigation.defaultProps = defaultProps;
