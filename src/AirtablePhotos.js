import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// const url = "/api/photo-pakistan-2021";
const url = "/api/pakistan-2021";

const AirtablePhotos = () => {
  const [photos, setPhotos] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      const { data } = response;
      // console.log(response);
      setPhotos(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []); // ON INITIAL RENDER

  return (
    <>
      <section className='section section-center'>
        <div className='title'>
          <h2>airtable - photos</h2>
          <h4>(from own server - netlify serverless function)</h4>
          <a href='/api/photo-pakistan-2021' target='_blank'>
            <h5>airtable (PHOTO) : API GET [LIST]</h5>
          </a>
          <a
            href='./api/photo-pakistan-2021?id=recIn2yA4XTpyUoC9'
            target='_blank'
          >
            <h5>airtable (PHOTO) : API GET [RETRIEVE]</h5>
          </a>
          <a href='/api/travel-pakistan-2021' target='_blank'>
            <h5>airtable (TRAVEL) : API GET [LIST]</h5>
          </a>
          <a
            href='./api/travel-pakistan-2021?id=rec0GbGEd6JwZiKli'
            target='_blank'
          >
            <h5>airtable (TRAVEL) : API GET [RETRIEVE]</h5>
          </a>

          <a href='/api/pakistan-2021' target='_blank'>
            <h5>airtable (ALL BASES) : API GET [LIST]</h5>
          </a>
          <a
            href='./api/pakistan-2021?base=appv2oResQa7hxFNW&id=rec0GbGEd6JwZiKli'
            target='_blank'
          >
            <h5>airtable (BY BASE, ID) : API GET [RETRIEVE]</h5>
          </a>

          <br />
          <a href='/api/pakistan-2021?type=lightbox' target='_blank'>
            <h5>airtable (PAKISTAN 2021) LIGHTBOX : API GET [LIST]</h5>
          </a>
          <a href='/api/indonesia-2014' target='_blank'>
            <h5>airtable (INDONESIA 2014) LIGHTBOX : API GET [LIST]</h5>
          </a>

          <div className='title-underline'></div>
        </div>
        <div className='products'>
          {photos.map((product) => {
            // const { id, name, url, date, location } = product;
            const { base, id, name, url_512: url, date, location } = product;
            return (
              // <article className='product' key={id}>
              <Link
                // to={`/photo-pakistan-2021/${id}`}
                to={`/photo-pakistan-2021/${base}/${id}`}
                className='product'
                key={id}
              >
                <img src={url} alt={name} />
                <div className='info'>
                  <h5>{name}</h5>
                  <h5 className='price'>{location}</h5>
                  <h5>{date}</h5>
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

export default AirtablePhotos;

// id: "recJjarejIgBPdDQk",
// name: "blue sneakers",
// url: "https://dl.airtable.com/.attachments/76d822ac76229be54478c1224a422928/a4f6b077/product-1.jpg",
// price: 39.99,
// createdTime: "2021-03-11T13:04:54.000Z",
// filename: "product-1.jpg",
// size: 34090
