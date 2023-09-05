import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import { routes } from "./constants";
import Cart from "./Cart";

function App() {
  const [cartData, setCartData] = useState([]);
  const addProduct = (product) => {
    if (!cartData.length) {
      const currentData = cartData;
      currentData.push(product);
      setCartData(currentData);
    } else {
      let itemIsHave = cartData.find((item) => item.id === product.id);
      if (itemIsHave) {
        itemIsHave.qty+=1;
      } else {
        const currentData = cartData;
        currentData.push(product);
        setCartData(currentData);
      }
    }
    console.log(cartData);
  };
  return (
    <main>
      <Header />
      <Routes>
        <Route path={routes.HOME} element={<Home addToCart={addProduct} />} />
        <Route path={routes.CART} element={<Cart data={cartData} addToCart={addProduct} setCartData={setCartData} />} />
      </Routes>
    </main>
  );
}

export default App;
