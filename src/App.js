import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import Home from "./component/Home/Home";
import UserProfile from "./component/Profile/UserProfile";
import Login from "./component/Login/Login";
import Registration from "./component/Register/Registration";
import "./common.css"; // Import your common CSS here


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
