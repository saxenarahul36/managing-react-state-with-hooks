import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useFetchAll from "../../services/useFetchAll";
import Spinner from "../common/Spinner";
import { GlobalContext } from "../context/GlobalState";

export default function Cart() {
  const { updateQuantity, cart } = useContext(GlobalContext);
  const navigate = useNavigate();

  const urls = cart.map((i) => `products/${i.id}`);
  const { data: products, loading, error } = useFetchAll(urls);

  function renderItem(itemInCart) {
    debugger;
    const { id, sku, quantity } = itemInCart;
    const { price, name, image, skus } = products.find(
      (p) => p.id === parseInt(id)
    );
    const { size } = skus.find((s) => s.sku === sku);

    return (
      <li key={sku} className="cart-item">
        <img src={`/images/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>${price}</p>
          <p>Size: {size}</p>
          <p>
            <select
              aria-label={`Select quantity for ${name} size ${size}`}
              onChange={(e) => updateQuantity(sku, parseInt(e.target.value))}
              value={quantity}
            >
              <option value="0">Remove</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
        </div>
      </li>
    );
  }

  if (loading) return <Spinner />;
  if (error) throw error;
  const totalItemsInCart = cart.reduce(
    (total, currentItem) => total + currentItem.quantity,
    0
  );

  return (
    <section id="cart">
      <h1>Cart</h1>
      <h3>
        {totalItemsInCart === 0
          ? "Your cart is empty"
          : ` Total number of items in cart :${totalItemsInCart}`}
      </h3>
      <ul>{cart.map(renderItem)}</ul>
      <p>
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate("/checkout");
          }}
        >
          Checkout
        </button>
      </p>
    </section>
  );
}
