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
        <img className="logo" src="/images/csc-logo.png" alt="logo" />
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
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {"B & Q"}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <NavLink href="/bandq/turnover">Turnover</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href="/bandq/orderwell">Order Well</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href="/bandq/comparison">Sales Comparison</NavLink>
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
