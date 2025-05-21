import React from 'react'
import './slidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../Assets/product_cart.svg'
import list_product_icon from '../../Assets/product_list_icon.svg'


const slidebar = () => {
  return (
    <div className="slidebar">
        <Link to='/addproduct' style={{textDecoration:"none"}}>
        <div className="slidebar-item">
            <img src={add_product_icon} alt="" />
            <p>Add Product</p>
        </div>
        </Link>
        <Link to='/listproduct' style={{textDecoration:"none"}}>
        <div className="slidebar-item">
            <img src={list_product_icon} alt="" />
            <p>Product List</p>
        </div>
        </Link>
      
    </div>
  )
}

export default slidebar
