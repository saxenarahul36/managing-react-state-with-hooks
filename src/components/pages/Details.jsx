import React, { useState, useContext } from "react";
import Products from "./Product";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Spinner from "../common/Spinner";
import { useNavigate } from "react-router-dom";
import PageNotFound from "../common/PageNotFound";
import { GlobalContext } from "../context/GlobalState";

export default function Details() {
  const { addToCart } = useContext(GlobalContext);
  const navigation = useNavigate();
  const { id } = useParams();
  const [size, setSize] = useState("");
  const { loading, data: product, error } = useFetch(`products/${id}`);
  if (loading) return <Spinner></Spinner>;
  if (product.length === 0) return <PageNotFound />;
  if (error) throw error;
  const setSizeHandler = (e) => {
    setSize(e.target.value);
  };
  return (
    <div id="details">
      <h1>{product?.name}</h1>
      <p>{product?.description}</p>
      <p>${product?.price}</p>

      <section id="filters">
        {/* <label htmlFor="size">Filter by Size:</label>{" "} */}
        <select id="size" value={size} onChange={setSizeHandler}>
          <option value="">Whats size ?</option>
          {product.skus.map((item) => {
            return (
              <option key={item.size} value={item.sku}>
                {item.size}
              </option>
            );
          })}
        </select>
        {/* {size ? <h2>Found {filteredProduct.length} items</h2> : null} */}
      </section>
      <p>
        <button
          disabled={!size}
          className="btn btn-primary"
          onClick={() => {
            addToCart(id, size);
            navigation("/cart");
          }}
        >
          Add to cart
        </button>
      </p>

      <img src={`/images/${product?.image}`} alt={product?.category}></img>
    </div>
  );
}
