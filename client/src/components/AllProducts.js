import React from 'react';
import { Link } from 'react-router-dom';
import './css/AllProducts.css';

const AllProducts = ({ data }) => {
  return (
    <div className='allproducts'>
      <Link
        className='link-tag-nostyle'
        to={`/products/${data._id}`} 
        target='_blank'>
        <img className='allproducts-img' src={data.imageUrl} alt={data.name} />
        <p className='allproducts-name'>{data.name}</p>
        <p className='allproducts-price'>₹ {data.price}</p>
      </Link>
    </div>
  );
};

export default AllProducts;
