import React from 'react'
// import Data from '../Assets/data.js'
import Item from '../items/items.js'
import './popular.css'
import {useState,useEffect} from 'react'


const Popular = () => {
  const [popular,setpopular]=useState([])
    const getnewcollection=async()=>{
      await fetch('https://ecommerce-f04h.onrender.com/popularinwomen').then((res)=>res.json()).then((data)=>setpopular(data))
    }
    useEffect(()=>{
      getnewcollection()
    },[])
  return (
    <div className="popular">
        <div className="text">
            <p>POPULAR IN WOMEN</p>
            <hr />
        </div>
        <div className="items">
            {popular.map((item)=>
                <Item id={item.id} name={item.name} image={item.image} newprice={item.new_price} oldprice={item.old_price}></Item>


            )}
        </div>
      
    </div>
  )
}

export default Popular
