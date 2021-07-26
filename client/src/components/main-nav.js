import { NavLink } from "react-router-dom";
import React from "react";

const MainNav = () => (
  <div className="navbar-nav mr-auto">
    <NavLink
      to="/"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Home
    </NavLink>
    <NavLink
      to="/profile"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Profile
    </NavLink>
    <NavLink
      to="/create"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Create
    </NavLink>
    <NavLink
      to="/categories"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Quick Lists
    </NavLink>
    {/* add about page  */}
  </div>
);

export default MainNav;
