import axios from "axios";
import React, { useEffect, useState } from "react";
import { filters } from "./constants";
const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItemsLength, setTotalItemsLength] = useState(0);
  const [filtered, setFiltered] = useState(false);
  const [filterVal, setFilterVal] = useState({ value: "", down: true });
  const itemsPerPage = 20;
  const getData = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
          currentPage * itemsPerPage - 20
        }`,
        data: {},
      });
      setProducts(data.products?.slice(0, itemsPerPage));
      setTotalItemsLength(data?.total);
    } catch (err) {
      console.log(err);
    }
  };
  const filter = () => {
    if (filterVal.value === "price") {
      if (filterVal.down) {
        let newArray = products.sort((a, b) => b.price - a.price);
        setProducts([...newArray]);
      } else {
        let newArray = products.sort((a, b) => a.price - b.price);
        setProducts([...newArray]);
      }
    } 
    else if(filterVal.value === "discount") {
      if (filterVal.down) {
        let newArray = products.sort((a, b) => b.discountPercentage - a.discountPercentage);
        setProducts([...newArray]);
      } else {
        let newArray = products.sort((a, b) => a.discountPercentage - b.discountPercentage);
        setProducts([...newArray]);
      }
    }
    else if(filterVal.value === "rating") {
      if (filterVal.down) {
        let newArray = products.sort((a, b) => b.rating - a.rating);
        setProducts([...newArray]);
      } else {
        let newArray = products.sort((a, b) => a.rating - b.rating);
        setProducts([...newArray]);
      }
    }
    else if(filterVal.value === "in Stock") {
      if (filterVal.down) {
        let newArray = products.sort((a, b) => b.stock - a.stock);
        setProducts([...newArray]);
      } else {
        let newArray = products.sort((a, b) => a.stock - b.stock);
        setProducts([...newArray]);
      }
    } else {
      getData()
    }

  };
  const nextPageBtn = () => {
    if (currentPage < Math.ceil(totalItemsLength / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const prevPageBtn = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const selectedOption = (e) => {
    filters?.map((item) => {
      if (item.value === e.target.value) {
        setFilterVal({ ...filterVal, value: e.target.value });
        setFiltered(true);
      } else if(e.target.value === 'filtersiz') {
        setFilterVal({...filterVal, value: ""})
      }
    });
    if (filtered) {
      filter();
    }
  };
  const selectedOptionDown = (e) => {
    if (e.target.value === "true") {
      setFilterVal({ ...filterVal, down: true });
    } else {
      setFilterVal({ ...filterVal, down: false });
    }
  };
  const addProduct = (id) => {
    let product = products.find((item) => item.id === id);
    addToCart({ ...product, qty: 1 });
  };
  useEffect(() => {
    filter();
  }, [filterVal]);
  useEffect(() => {
    getData();
    if (filtered) {
      filter();
    }
  }, [currentPage]);
 
  return (
    <>
      <div className="filter">
        <select name="filter" id="filter" onChange={selectedOption}>
          <option value="filtersiz">Filtersiz</option>
          {filters?.map((item, i) => (
            <option value={item.value} key={i}>
              {item.value}
            </option>
          ))}
        </select>
        <select name="filter" id="filter2" onChange={selectedOptionDown}>
          <option value="true">Balanddan</option>
          <option value="false">Pastdan</option>
        </select>
      </div>
      <div className="products-box">
        {products?.map((item, i) => (
          <div className="product-card" key={i}>
            <img
              className="product-thumbnail"
              src={item?.thumbnail}
              alt={item.title}
            />
            <h2 className="product-title">{item?.title}</h2>
            <p className="product-description">{item?.description}</p>
            <div className="product-details">
              <p className="product-price">${item?.price}</p>
              <p className="product-discount">
                Discount: {item?.discountPercentage}%
              </p>
              <p className="product-rating">Rating: {item?.rating}</p>
              <p className="product-stock">In Stock: {item?.stock}</p>
              <p className="product-brand">Brand: {item?.branch}</p>
              <p className="product-category">Category: {item?.category}</p>
            </div>
            <button className="btn" onClick={() => addProduct(item?.id)}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => prevPageBtn()}
          className={!(currentPage > 1) ? "btn-disabled" : ""}
        >
          Previous
        </button>
        <button
          onClick={() => nextPageBtn()}
          className={
            !(currentPage < Math.ceil(totalItemsLength / itemsPerPage))
              ? "btn-disabled"
              : ""
          }
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Home;
