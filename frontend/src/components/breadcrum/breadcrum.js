import React from 'react'
import'./breadcrum.css'
import arrow from '../Assets/breadcrum_arrow.png'

const breadcrum = (props) => {
    const {product}=props
    console.log(product)
  return (
    <div className="breadcrum">
        HOME <img src={arrow} alt="" />SHOP <img src={arrow} alt="" /> {product.category} <img src={arrow} alt="" />{product.name}
      
    </div>
  )
}

export default breadcrum
