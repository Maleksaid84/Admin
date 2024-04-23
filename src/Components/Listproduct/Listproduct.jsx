import React, { useEffect, useState } from 'react';
import './Listproduct.css';
import cross_icon from '../../assets/remove_icon.png';
import axios from 'axios';

const Listproduct = () => {
  const [allproducts, setAllproducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await axios.get('https://malek.onrender.com/allproducts');
      setAllproducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

//Remove Products
  const handleDelete = async (id) => {
    try {
      await axios.delete('https://malek.onrender.com/removeproduct/' + id);
      fetchInfo(); // Actualiser la liste des produits après suppression
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className='listproduct-format-main'>
        <p>Products</p>
        <p>Titels</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allproducts'>
        <hr />
        {allproducts.map((product, index) => (
          <div key={index} className='Listproduct-format-main listproduct-format'>
            <img src={product.image} alt='' className='listproduct-product-icon' />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={() => handleDelete(product._id)} className='listproduct-remove-icon' src={cross_icon} alt='' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listproduct;
