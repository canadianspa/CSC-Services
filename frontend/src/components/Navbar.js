import React, { useState } from "react";

import {
  Navbar as NavigationBar,
  NavItem,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavigationBar color="dark" dark expand="md">
      <NavbarBrand href="/">
        <img alt="logo" src="/images/csc-logo.png" />
      </NavbarBrand>
      <NavbarBrand href="/">CSC Services</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/update">Update</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/import">Import</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/calendar">Calendar</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar style={{ backgroundColor: "#343a40" }}>
            <DropdownToggle nav caret>
              B & Q
            </DropdownToggle>
            <DropdownMenu right style={{ backgroundColor: "#343a40" }}>
              <DropdownItem style={{ backgroundColor: "#343a40" }}>
                <NavLink href="/bandq/turnover" style={{ padding: "0" }}>
                  Turnover
                </NavLink>
              </DropdownItem>
              <DropdownItem style={{ backgroundColor: "#343a40" }}>
                <NavLink href="/bandq/orderwell" style={{ padding: "0" }}>
                  Order Well
                </NavLink>
              </DropdownItem>
              <DropdownItem style={{ backgroundColor: "#343a40" }}>
                <NavLink href="/bandq/comparison" style={{ padding: "0" }}>
                  Sales Comparison
                </NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem>
            <NavLink href="/portables">Portables</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/guides">Guides</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </NavigationBar>
  );
}

export default Navbar;
