import React from "react";
import Products from "./Product";

export default function Details(props) {
  const { product } = props;
  return (
    <div id="details">
      <h1>{"Details "}</h1>
      <p>{product?.descriptions}</p>
      <p>{product?.price}</p>
      <img src={`/image/${product?.image}`} alt={product?.category}></img>
    </div>
  );
}
