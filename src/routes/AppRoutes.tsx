import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth/Auth";
import SignUp from "../pages/Auth/SignUp";
import Home from "../pages/Home/Home";
import Search from "../pages/Search/Search";
import ExploreProducts from "../pages/ExploreProducts/ExploreProducts";
import ProductDetail from "../pages/ProductDetail/ProductDetail"; // Importando ProductDetail

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/explore-products" element={<ExploreProducts />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} /> {/* Nova rota */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
