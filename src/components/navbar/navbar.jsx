import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { connect } from "react-redux";

import "./navbar.scss";

export function NavBar({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };
  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };
  return (
    <Navbar className="navbar fixed-top navbar-expand-lg navbar-dark">
      <Container>
        <Navbar.Brand className="navbar-logo" as={Link} to="/">
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && (
              <Nav.Link as={Link} to={`/users/${user}`}>
                {user}
              </Nav.Link>
            )}
            {isAuth() && (
              <Button
                variant="btn btn-danger"
                onClick={() => {
                  onLoggedOut();
                }}
              >
                Logout
              </Button>
            )}
            {!isAuth() && (
              <Nav.Link as={Link} to="/">
                Login
              </Nav.Link>
            )}
            {!isAuth() && (
              <Nav.Link as={Link} to="/register">
                Sign Up
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

let mapStateToProps = (state) => {
  return {
    user: state.user,
    movies: state.movies,
  };
};

export default connect(mapStateToProps)(NavBar);
