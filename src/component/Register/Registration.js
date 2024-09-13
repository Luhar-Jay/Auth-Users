import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Registration.css";

// Defining the Registration component
const Registration = () => {
  // States to store form values and error messages
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.number) newErrors.number = "Mobile number is required.";
    else if (!/^\d{10}$/.test(formData.number))
      newErrors.number = "Enter a valid 10-digit mobile number.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address.";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password should be at least 6 characters.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle registration function
  const handleRegister = () => {
    if (!validateForm()) return;

    // Check if the user already exists
    const storedUsersString = localStorage.getItem("users");
    const storedUsers = storedUsersString ? JSON.parse(storedUsersString) : [];
    const userExists = storedUsers.some((user) => user.email === formData.email);

    if (userExists) {
      alert("User already exists.");
      return;
    }

    // Add new user and update localStorage
    storedUsers.push(formData);
    localStorage.setItem("users", JSON.stringify(storedUsers));
    console.log("User registered successfully!");

    navigate("/login");
  };

  return (
    <div className="reg-container">
      <div>
        <h2>Sign Up</h2>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="form-group" controlId="formBasicName">
            <Form.Label className="form-label">Name</Form.Label>
            <Form.Control
              name="name"
              className="form-control"
              type="text"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </Form.Group>

          <Form.Group className="form-group" controlId="formBasicNumber">
            <Form.Label className="form-label">Mobile</Form.Label>
            <Form.Control
              name="number"
              className="form-control"
              type="text"
              placeholder="Enter Your Number"
              value={formData.number}
              onChange={handleChange}
            />
            {errors.number && <p style={{ color: "red" }}>{errors.number}</p>}
          </Form.Group>

          <Form.Group className="form-group" controlId="formBasicEmail">
            <Form.Label className="form-label">Email address</Form.Label>
            <Form.Control
              name="email"
              className="form-control"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </Form.Group>

          <Form.Group className="form-group" controlId="formBasicPassword">
            <Form.Label className="form-label">Password</Form.Label>
            <Form.Control
              name="password"
              className="form-control"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleRegister}>
            Sign Up
          </Button>
        </Form>
        <Link to={"/login"} className="sign-up-link">
          <p style={{ cursor: "pointer" }}>Already registered? Sign In Now.</p>
        </Link>
      </div>
    </div>
  );
};

export default Registration;
