import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ColorButton } from "./Styled";
import firebase from "../Firebase";
import { useAuth } from "../context/Auth";

const Menu = () => {
  // Retrieve the authenticated user object and assign it to the user variable.
  const { user } = useAuth();
  const displayEmail = user?.email;
  const navigate = useNavigate();
  // the isLoggedIn state variable determines whether a user is logged in or not. It is initially set to false.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // The useEffect hook is used to listen for changes in the user's authentication state. 
  // When the authentication state changes, it updates the isLoggedIn state variable accordingly.
  useEffect(() => {
    const logout = firebase.auth().onAuthStateChanged((user) => {
      setIsLoggedIn(user ? true : false);
    });
    return logout;
  }, []);

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('User logged out.')
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
              {/* If isLoggedIn is true, it renders a "Logout" link (NavLink) that triggers the handleLogout function when clicked. 
              If isLoggedIn is false, it renders a "Sign In" link (NavLink) with a reference to the "/login" route 
              and a "Sign Up" link (NavLink) with a reference to the "/signup" route. */}
              {isLoggedIn ? (
                <NavDropdown title={displayEmail} menuVariant="light">
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <NavLink className="nav-link ml-auto" to="/login">Sign In</NavLink>
                  <NavLink className="ml-auto" to="/signup"><ColorButton>Sign Up</ColorButton></NavLink>
                </>
              )}
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
  };
  
  export default Menu;