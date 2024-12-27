import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import DashBoard from "./components/DashBoard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashBoard />} /> {/* Root path */}
        <Route path="/products" element={<ProductList />} />{" "}
        {/* Product List */}
        <Route path="/products/:id" element={<ProductDetail />} />{" "}
        {/* Product Detail */}
      </Routes>
    </Router>
  );
}

export default App;
