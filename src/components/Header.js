import React from "react";
import {Nav, Navbar, Container} from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Menu = () => {

    return (
      <div>
        <Navbar bg="light" expand="lg" variant="light" className="fixed-top">
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
                <NavLink className="nav-link ml-auto" to="/register">Register</NavLink>
                <NavLink className="nav-link ml-auto" to="/login">Login</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  };
  
  export default Menu;