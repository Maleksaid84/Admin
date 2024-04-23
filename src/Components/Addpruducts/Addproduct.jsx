import React, { useState } from 'react'
import './Addproduct.css'
import upload_area from '../../assets/upload_area.svg'

const Addproduct = () => {
 
const [image,setImage] = useState(false);

const [productDetails,setProductDetails] = useState ({
      name:"",
      image:"",
      category:"women",
      new_price:"",
      old_price:"",
})

const imageHandler = (e) =>{
      setImage(e.target.files[0]);
}

const changeHandler = (e) =>{
     setProductDetails({...productDetails,[e.target.name]:e.target.value})
}

const Add_product = async () => {
  console.log(productDetails);

  try {
      let formData = new FormData();
      formData.append('product', image);

      // Envoyer la requête pour uploader l'image
      const uploadResponse = await fetch('https://malek.onrender.com/upload', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
          },
          body: formData,
      });
      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
          // Si l'upload de l'image réussit, ajouter le produit avec l'URL de l'image
          const productData = {
              ...productDetails,
              image: uploadData.image_url,
          };

          // Envoyer la requête pour ajouter le produit
          const addProductResponse = await fetch('https://malek.onrender.com/addproduct', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-type': 'application/json',
              },
              body: JSON.stringify(productData),
          });
          const addProductData = await addProductResponse.json();

          if (addProductData.success) {
              alert("Product Added");
          } else {
              alert("Failed to add product");
          }
      } else {
          alert("Failed to upload image");
      }
  } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product");
  }
}




  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type='text' name='name'placeholder='type here'/>
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price'placeholder='type here'/>
            </div>
            <div className="addproduct-itemfield">
            <p> Offre Price</p>
            <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price'placeholder='type here'/>
            </div>
            </div>
            <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kids</option>
            <option value="camping Gear">Camping Gear</option>
            
            </select>
            </div>
            <div className="addproduct-itemfield">
              <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />

              </label>
              <input onChange={imageHandler} type="file"name='image'id='file-input' hidden />
            </div>
            <button onClick={()=>{Add_product()}} className='product-btn'>ADD</button>



    </div>
  )
}

export default Addproduct