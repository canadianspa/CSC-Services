import React, { useState } from "react";
import {
  Navbar as NavigationBar,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
} from "reactstrap";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavigationBar color="dark" dark expand="md">
      <NavbarBrand href="/">
        <img className="logo" src="/images/csc-logo.png" alt="logo" />
      </NavbarBrand>
      <NavbarBrand href="/">CSC Services</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavLink href="/update">Update</NavLink>
          <NavLink href="/import">Import</NavLink>
          <NavLink href="/turnover">Turnover</NavLink>
          <NavLink href="/orderwell">Order Well</NavLink>
          <NavLink href="/shipping">Shipping</NavLink>
        </Nav>
      </Collapse>
    </NavigationBar>
  );
}

export default Navbar;
