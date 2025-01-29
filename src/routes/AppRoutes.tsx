import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth/Auth";
import SignUp from "../pages/Auth/SignUp";
import Home from "../pages/Home/Home";
import Search from "../pages/Search/Search"

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
