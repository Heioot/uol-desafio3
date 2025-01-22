import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from '../pages/Auth/Auth';
// import Home from '../pages/Home/Home';
// import Search from '../pages/Search/Search';
// import ExploreProducts from '../pages/ExploreProducts/ExploreProducts';
// import ProductDetail from '../pages/ProductDetail/ProductDetail';
// import ShoppingCart from '../pages/ShoppingCart/ShoppingCart';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        {/* <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/explore-products" element={<ExploreProducts />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
