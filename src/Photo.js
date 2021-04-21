import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Photo = () => {
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(null);

  const data = useParams();
  const { photoID } = data;
  // console.log('useParams()', data);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/photo-pakistan-2021?id=${photoID}`
      );
      const { data } = response;
      // console.log(response);
      setPhoto(data);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []); // ON INITIAL RENDER

  if (loading) {
    return (
      <section className='section section-center'>
        <h2>Loading...</h2>
      </section>
    );
  }

  // const { fields } = product;
  // const { name, desc, price, image } = fields;
  // const { url } = image[0];
  const { id, name, url, date, location } = photo;

  return (
    <section className='section section-center'>
      <Link to='/' className='link'>
        Back Home
      </Link>
      <div>
        <div className='title'>
          <h2>{name}</h2>
          <div className='title-underline'></div>
        </div>
        <article className='single-product'>
          <img src={url} alt={name} className='single-product-img' />
          <div>
            <h5 className='price'>{location}</h5>
            <h5>{date}</h5>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Photo;
