import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginPage.css";

// Defining the Login component
const Login = () => {
  // State for email, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");
    if (isAuth) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = () => {
    const storedUsersString = localStorage.getItem("users");
    let storedUsers = [];

    if (storedUsersString) {
      storedUsers = JSON.parse(storedUsersString);
    }

    const foundUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("loggerInUser", foundUser.name);
      localStorage.setItem("loggerInUserEmail", foundUser.email);
      localStorage.setItem("loggerInUserNumber", foundUser.number);
      navigate("/");
    } else {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div>
        <h2>Sign In</h2>

        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="form-group" controlId="formBasicEmail">
            <Form.Label className="form-label">Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              type="email"
              placeholder="Email Address"
              aria-required="true"
            />
          </Form.Group>

          <Form.Group className="form-group" controlId="formBasicPassword">
            <Form.Label className="form-label">Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              type="password"
              placeholder="Password"
              aria-required="true"
            />
          </Form.Group>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <Button variant="primary" type="submit" onClick={handleLogin}>
            Login
          </Button>
        </Form>

        <Link to={"/registration"} className="sign-up-link">
          <p>New User? Sign up now.</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
