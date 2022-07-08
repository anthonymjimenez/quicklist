// src/components/nav-bar.js
import React from "react";
import MainNav from "./main-nav";
import AuthNav from "./auth-nav";
import { Navbar, NavbarToggler, Collapse, Nav, NavbarBrand } from "reactstrap";

function NavBar() {
  // Collapse isOpen State
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="nav-container mb-3">
      <Navbar color="light" bg="primary" light expand="md">
        <NavbarBrand className="m-2" href="/">
          Quick List
        </NavbarBrand>
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <MainNav />
            <div className="m-1" />
            <AuthNav />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
