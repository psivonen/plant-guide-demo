import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";

const Menu = () => {

    return (
        <Navbar bg="white" expand="lg" variant="light" className="fixed-top">
          <Container>
            <Link className="navbar-brand" to="/">
              Plant Guide
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink className="nav-link" to="/">
                  Search
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
  };
  
  export default Menu;