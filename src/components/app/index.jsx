import React, { useState, useEffect } from "react";
import "../../App.css";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Details from "../pages/Details";
import Checkout from "../pages/Checkout";

import { Routes, Route } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

export default function App() {
  const [cart, setCart] = useState(() => {
    // if user refresh the browser then we need to persist cart details in app
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id, sku) => {
    setCart((items) => {
      const itemsInCart = items.find((i) => i.sku === sku);
      if (itemsInCart) {
        return items.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...items, { id, sku, quantity: 1 }];
    });
  };
  const updateQuantity = (sku, quantity) => {
    setCart((items) => {
      // with if
      // if (quantity === 0) {
      //     return items.filter((i) => i.sku !== sku);
      // }
      // return items.map((i) => (i.sku === sku ? { ...i, quantity } : i));

      // with ternary operator
      return quantity === 0
        ? items.filter((i) => i.sku !== sku)
        : items.map((i) => (i.sku === sku ? { ...i, quantity } : i));
    });
  };
  const emptyCart = () => {
    setCart([]);
  };

  const contextValues = {
    updateQuantity,
    addToCart,
    cart,
    emptyCart,
  };
  return (
    <>
      <GlobalContext.Provider value={contextValues}>
        <div className="content">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<h1>Welcome Online shopping </h1>} />
              <Route path="/:category" element={<Product />} />
              <Route path="/:category/:id" element={<Details />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
        </div>
      </GlobalContext.Provider>

      <Footer />
    </>
  );
}
