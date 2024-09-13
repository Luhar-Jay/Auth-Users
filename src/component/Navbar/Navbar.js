import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Dropdown, Nav, Navbar as BootstrapNavbar } from "react-bootstrap";
import "./Navbar.css";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      // check authentication and user data
      const isAuth = localStorage.getItem("isAuth");
      if (isAuth) {
        setIsAuthenticated(true);
        const userName = localStorage.getItem("loggerInUser");
        setName(userName || "My Account");
      } else {
        setIsAuthenticated(false);
        setName("");
      }
    

   
  }, [navigate]);

  const handleLoginLogout = () => {
    if (isAuthenticated) {
      // Logout functionality
      localStorage.removeItem("isAuth");
      localStorage.removeItem("loggerInUser");
      localStorage.removeItem("loggerInUserEmail");
      localStorage.removeItem("loggerInUserNumber");
      setIsAuthenticated(false);
      setName("");
      navigate("/login");
    } else {
      // Navigate to login page
      navigate("/login");
    }
  };

  return (
    <BootstrapNavbar bg="light" expand="lg" className="navbar navbar-light bg-light">
      <Container>
        <BootstrapNavbar.Brand href="/" className="font-weight-bold">
          User Auth Demo
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" id="dropdown-basic" className="profile-dropdown">
                  {name ? `Hello, ${name}` : "My Account"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">
                    Edit Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLoginLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button variant="primary" onClick={handleLoginLogout}>
                Login
              </Button>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
