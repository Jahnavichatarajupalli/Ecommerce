import React from 'react'
// import all_products from '../components/Assets/all_product.js'
import arrow from '../components/Assets/dropdown_icon.png'
import Item from '../components/items/items.js'
import './shopcategory.css'
import {useContext} from 'react'
import { shopcontext } from '../context/shopcontext.js'

const Shopcategory = (props) => {
  const {all_products}=useContext(shopcontext)
  return (
  
    <div className="category">
      <div className="banner">
      <img src={props.banner} alt="" />
      </div>
      <div className="sort">
        <p>showing 1-12 <span>out of 36 products</span></p>
         <div> sort by <img src={arrow} alt=""/></div></div>

        
    
      <div className="lists">
      {all_products.map((item)=>{
        if(props.category===item.category){
          return <Item id={item.id} name={item.name} image={item.image} newprice={item.new_price} oldprice={item.old_price}></Item>
        }})
      }
      </div>
      
    </div>
  )
}

export default Shopcategory
