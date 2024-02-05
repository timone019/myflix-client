import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut }) => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const logoutAndNavigate = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        onLoggedOut();
        gonavigate("/login");
      } catch (error) {
        console.error("Logout or navigation failed:", error);
      }
    }
  };

  return (
    <Navbar
      bg={theme}
      variant={theme === "light" ? "light" : "dark"}
      expand="lg"
      fixed="top"
      onClick={() => window.scrollTo(0, 0)}>
      <Container>
        <Navbar.Brand>Movie App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  All Movies
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={() => onLoggedOut()} as={Link} to="/">
                  Logout
                </Nav.Link>
              </>
            )}
            <Form.Check
              type="switch"
              id="custom-switch"
              label={theme === "light" ? "Light" : "Dark"}
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
