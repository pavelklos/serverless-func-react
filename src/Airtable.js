import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const url = '/api/products';

const Airtable = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      const { data } = response;
      // console.log(response);
      setProducts(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []); // ON INITIAL RENDER

  return (
    <>
      <section className='section section-center'>
        <div className='title'>
          <h2>airtable</h2>
          <h4>(from own server - netlify serverless function)</h4>
          <a href='/api/products' target='_blank'>
            <h5>airtable (PRODUCTS) : API GET [LIST]</h5>
          </a>
          <a href='./api/products?id=recrant2u2MiI2IJy' target='_blank'>
            <h5>airtable (PRODUCT) : API GET [RETRIEVE]</h5>
          </a>
          <div className='title-underline'></div>
        </div>
        <div className='products'>
          {products.map((product) => {
            const { id, name, url, price } = product;
            return (
              // <article className='product' key={id}>
              <Link to={`/product/${id}`} className='product' key={id}>
                <img src={url} alt={name} />
                <div className='info'>
                  <h5>{name}</h5>
                  <h5 className='price'>${price}</h5>
                </div>
              </Link>
              // </article>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Airtable;

// id: "recJjarejIgBPdDQk",
// name: "blue sneakers",
// url: "https://dl.airtable.com/.attachments/76d822ac76229be54478c1224a422928/a4f6b077/product-1.jpg",
// price: 39.99,
// createdTime: "2021-03-11T13:04:54.000Z",
// filename: "product-1.jpg",
// size: 34090
