import React from 'react'
import Data from '../Assets/data.js'
import Item from '../items/items.js'
import '../popular/popular.css'


const relatedproducts = () => {
  return (
    <div className="popular">
    <div className="text">
        <p>Related Products</p>
        <hr />
    </div>
    <div className="items">
        {Data.map((item)=>
            <Item id={item.id} name={item.name} image={item.image} newprice={item.new_price} oldprice={item.old_price}></Item>


        )}
    </div>
  
</div>
  )
}

export default relatedproducts
