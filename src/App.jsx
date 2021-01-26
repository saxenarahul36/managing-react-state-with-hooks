import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Product from "./Product";
import Cart from "./Cart";
import Details from "./Details";

import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome Online shopping </h1>} />
            <Route path="/:category" element={<Product />} />
            <Route path="/:category/:id" element={<Details />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
