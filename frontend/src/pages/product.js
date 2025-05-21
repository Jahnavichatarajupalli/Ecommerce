import React from 'react'
// import allproducts from '../components/Assets/all_product.js'
import {useParams} from 'react-router-dom'
import Breadcrum from '../components/breadcrum/breadcrum'
import Productdisplay from '../components/productdisplay/productdisplay'
import {useContext} from 'react'
import { shopcontext } from '../context/shopcontext'

const Product = () => {
  let {all_products}=useContext(shopcontext)
  const {productId}=useParams();
  const product=all_products.find((e)=>e.id===Number(productId))
  return (
    <div>
      <Breadcrum product={product}></Breadcrum>
      <Productdisplay product={product}></Productdisplay>
    </div>
  )
}

export default Product

