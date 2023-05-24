import React from "react";
import {Nav, Navbar, Container} from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { ColorButton } from "./Styled";

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
              <Nav>
                <NavLink className="nav-link ml-auto" to="/login">Sign In</NavLink>
                <NavLink className="ml-auto" to="/signup"><ColorButton>Sign Up</ColorButton></NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
  };
  
  export default Menu;