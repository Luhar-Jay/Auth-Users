import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";

import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  // State variables to store authentication status, user data, and email
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  // Use effect to check authentication status and load user data on mount
  useEffect(() => {
    // Check if user is authenticated
    const isAuth = localStorage.getItem("isAuth");
    if (isAuth) {
      setIsAuthenticated(true);
    }
    // Load user data from local storage
    const emailId = localStorage.getItem("loggerInUser");
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];

    const user = allUsers.find((user) => user.email === emailId);
    setUserData(user);
  }, []);

  // Handle login/logout functionality
  const handleLoginLogout = () => {
    if (!isAuthenticated) {
      navigate("/login"); // Navigate to login page if not authenticated
    } else {
      // Remove authentication tokens and user data on logout
      localStorage.removeItem("isAuth");
      localStorage.removeItem("loggerInUser");
      localStorage.removeItem("loggerInUserEmail");
      localStorage.removeItem("loggerInUserNumber");
      setIsAuthenticated(false);
      setUserData({});
    }
  };

  return (
    <div className="container mt-4">
      {/* Navbar setup with text logo on the left and profile/login button on the right */}
     

      <div>
        
        {isAuthenticated ? (
          <>
            <h2>Hi, {localStorage.getItem("loggerInUser")}</h2>
            <p>Email Address: {localStorage.getItem("loggerInUserEmail")}</p>
            <p>Mobile Number: {localStorage.getItem("loggerInUserNumber")}</p>
          </>
        ):
          <>
            <h2>Welcome to Homepage</h2>
          </>
        }
      </div>
    </div>
  );
};

export default Home;
