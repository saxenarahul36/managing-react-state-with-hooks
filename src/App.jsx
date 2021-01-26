import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Product from "./Product";
import Cart from "./Cart";
import Details from "./Details";

import { Routes, Route } from "react-router-dom";

export default function App() {
  const [cart, setCart] = useState(()=>{
    try{
      return JSON.parse(localStorage.getItem("cart")) ?? []
    }catch{
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
        ?  items.filter((i) => i.sku !== sku)
        : items.map((i) => (i.sku === sku ? { ...i, quantity } : i));
    });
  };
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome Online shopping </h1>} />
            <Route path="/:category" element={<Product />} />
            <Route
              path="/:category/:id"
              element={<Details addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  updateQuantity={updateQuantity}
                />
              }
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
