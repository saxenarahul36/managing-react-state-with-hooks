import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import Spinner from "./Spinner";
import useFetch from "./hooks/useFetch";
import PageNotFound from "./PageNotFound";
import { Link } from "react-router-dom";

export default function Products() {
  const [size, setSize] = useState(0);
  const { category } = useParams();
  // const [products, setProducts] = useState([]);
  // const [error, setError] = useState();
  // const [loading, setLoading] = useState(true);
  const { data: products, error, loading } = useFetch(
    `products?category=${category}`
  );
  // promis base call
  // useEffect(() => {
  //   getProducts("shoes")
  //     .then((response) => setProducts(response))
  //     .catch((error) => {
  //       setError(error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  // async and await
  // useEffect(() => {
  //   async function init() {
  //     try {
  //       const response = await getProducts("shoes");
  //       setProducts(response);
  //     } catch (err) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   init();
  // }, [error]);

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
      <Link to={`/${category}/${p.id}`}>
        
            <img src={`/images/${p.image}`} alt={p.name} />
            <h3>{p.name}</h3>
            <p>${p.price}</p>
       
      </Link>
       </div>
    );
  }
  const filteredProduct = size
    ? products.filter((item) => {
        return item.skus.find((s) => s.size === parseInt(size));
      })
    : products;
  const setSizeHandler = (e) => {
    setSize(e.target.value);
  };

  if (error) throw error;
  if (loading) return <Spinner />;
  if (products.length === 0 && !loading) return <PageNotFound />;
  return (
    <>
      {!loading ? (
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select id="size" onChange={setSizeHandler}>
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            {size ? <h2>Found {filteredProduct.length} items</h2> : null}
          </section>
          <section id="products">
            {" "}
            {filteredProduct.map(renderProduct)}{" "}
          </section>
        </main>
      ) : (
        <Spinner />
      )}
    </>
  );
}
