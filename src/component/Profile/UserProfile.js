import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserProfile.css";

const UserProfile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // check authentication and fetch user data
    const isAuth = localStorage.getItem("isAuth");
    if (isAuth) {
      setIsAuthenticated(true);
    }
    let emailid = localStorage.getItem("loggerInUserEmail");
    const getAllUsers = JSON.parse(localStorage.getItem("users")) || [];
    let user = getAllUsers.find((user) => user.email === emailid);
    setUserData(user);
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setOldEmail(user.email || "");
      setMobileNumber(user.number || "");
      setPassword(user.password || "");
    }
  }, []);

  const handleUpdate = () => {
    // Update local storage with the new user data
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];

  
    // Check if the email is already taken by another user
    const emailExists = allUsers.some((user) => user.email === email && user.email !== oldEmail);
  
  if (emailExists) {
    alert("User with this email already exists.");
    return;
  }


    const updatedUsers = allUsers.map((user) =>
      user.email === email ? { name, email, number: mobileNumber, password } : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.setItem("loggerInUser", name);
    localStorage.setItem("loggerInUserEmail", email);
    localStorage.setItem("loggerInUserNumber", mobileNumber);
    navigate("/");
  };

  return (
    <div className="reg-container mt-4">
      <h2>Edit Profile</h2>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group className="form-group mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-group mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
        </Form.Group>

        <Form.Group className="form-group mb-3" controlId="formBasicNumber">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-group mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UserProfile;
