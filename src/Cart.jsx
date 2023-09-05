import React, { useEffect } from "react";

const Cart = ({ data, setCartData }) => {
  const incrementProduct = (id) => {
    const product = data.find((item) => item.id === id);
    if (!data.length) {
      const currentData = data;
      currentData.push(product);
      setCartData(currentData);
    } else {
      let itemIsHave = data.find((item) => item.id === product?.id);
      if (itemIsHave) {
        itemIsHave.qty += 1;
        setCartData(data);
      } else {
        const currentData = data;
        currentData.push(product);
        setCartData(currentData);
      }
    }
    setCartData([...data]);

  };

  const decrementProduct = (id)=> {
    const product = data.find((item) => item.id === id);
    let itemIsHave = data.find((item) => item.id === product?.id);
    if (itemIsHave.qty > 1) {
      itemIsHave.qty -= 1;
      setCartData(data);
      setCartData([...data]);
    } 
    else {
      const currentData = data.filter(product => product.id !== id);
      setCartData(currentData);
    }
  }
  return (
    <div>
      <div className="container">
        <div className="cart-box">
          {data?.map((product) => (
            <div key={product.id} className="cart">
              <div style={{ display: "flex" }}>
                <img src={product?.thumbnail} style={{ width: "60px" }} />
                <p>{product?.title}</p>
              </div>
              <div className="cart-qty">
                <i className="bx bx-minus"
                onClick={() => decrementProduct(product?.id)}
                ></i>
                <p className="qty-p">{product?.qty}</p>
                <i
                  className="bx bx-plus"
                  onClick={() => incrementProduct(product?.id)}
                ></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
