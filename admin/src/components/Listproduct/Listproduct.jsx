import React from 'react'
import './Listproduct.css'
import {useState,useEffect} from 'react'
import cross_icon from '../../Assets/cross_icon.png'

const Listproduct = () => {
  const [allproducts,setallproducts]=useState([])
  const fetcheddata=async()=>{
    await fetch('http://localhost:4000/getproducts').then((res)=>res.json()
    ).then((data)=>{
      setallproducts(data)
    })
  }
  const removeproduct=async(id)=>{
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
          Accept:'application/json',
          'content-type':'application/json'
      },
      body:JSON.stringify({id:id})
  }).then((res)=>res.json()).then((data)=>{
    console.log(data)
    fetcheddata()

  })}
  useEffect(()=>{
    fetcheddata();
  },[])
  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product,index)=>{
          return <>
          <div key={index} className="listproduct-format-main listproduct-format">
            <img className="main"src={product.image} alt="" />
            <p className="title">{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{removeproduct(product.id)}}className='listproduct-remove-icon'src={cross_icon} alt="" />
            
          

          </div>
          <hr/>
          </>
        })}
      </div>
      
    </div>
  )
}

export default Listproduct
