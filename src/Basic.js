import React, { useState, useEffect } from 'react';
import axios from 'axios';

const url1 = 'https://serverless-functions-course.netlify.app/api/2-basic-api/'; // John Smilga
const url2 =
  'https://pavelklos-temporary-serverless-func.netlify.app/api/002-basic-api'; // Pavel Klos

const Basic = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(url2);
      const { data } = response;
      // console.log(response);
      setProducts(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []); // ON INITIAL RENDER

  return (
    <section className='section section-center'>
      <div className='title'>
        <h2>basic setup</h2>
        <h4>(from external URL - API)</h4>
        <div className='title-underline'></div>
      </div>
      <div className='products'>
        {products.map((product) => {
          const {
            id,
            name,
            image: { url },
            price,
          } = product;

          return (
            <article className='product' key={id}>
              <img src={url} alt={name} />
              <div className='info'>
                <h5>{name}</h5>
                <h5 className='price'>${price}</h5>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Basic;

// id: "recmg2a1ctaEJNZhu",
// name: "utopia sofa",
// image: {
//   url: "https://dl.airtable.com/.attachments/6ac7f7b55d505057317534722e5a9f03/9183491e/product-3.jpg"
// },
// price: 39.95
