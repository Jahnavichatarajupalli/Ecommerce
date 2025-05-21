import React from 'react'
import Data from '../Assets/new_collections.js'
import Item from '../items/items.js'
import './newcollection.css'
import {useState,useEffect} from 'react'

const Newcollection = () => {
  const [newcollection,setnewcollection]=useState([])
  const getnewcollection=async()=>{
    await fetch('http://localhost:4000/newcollection').then((res)=>res.json()).then((data)=>setnewcollection(data))
  }
  useEffect(()=>{
    getnewcollection()
  },[])
  return (
    <div className="popular">
    <div className="text">
        <p>NEW COLLECTIONS</p>
        <hr />
    </div>
    <div className="items">
        {newcollection.map((item)=>
            <Item id={item.id} name={item.name} image={item.image} newprice={item.new_price} oldprice={item.old_price}></Item>


        )}
    </div>
  
</div>
  )
}

export default Newcollection
