import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../assets/Add_product.png'
import list_product_icon from '../../assets/product_list.png'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to ={'/Addproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                 <img src={add_product_icon} alt="" />
                 <p>Add Product</p>
            </div>
        </Link>
        <Link to ={'/Listproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                 <img src={list_product_icon} alt="" />
                 <p>List Product</p>
            </div>
        </Link>


    </div>
  )
}

export default Sidebar