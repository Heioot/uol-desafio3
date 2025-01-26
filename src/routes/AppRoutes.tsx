import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth/Auth";
import SignUp from "../pages/Auth/SignUp";
import Home from "../pages/Home/Home";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
