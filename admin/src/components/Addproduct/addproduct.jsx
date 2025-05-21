import React from 'react'
import './addproduct.css'
import upload_area from '../../Assets/upload_area.svg'
import {useState} from 'react'

const Addproduct = () => {
    const [image,setimage]=useState(null)
    const [productdetails,setproducts]=useState({
        name:" ",
        image:" ",
        category:"women",
        new_price:" ",
        old_price:""
    })
    // console.log(image)
    const imagehandler=(e)=>{
        setimage(e.target.files[0])

    }
    const changehandler=(e)=>{
        setproducts({...productdetails,[e.target.name]:e.target.value})
    }
    const addproduct=async()=>{
        // console.log(productdetails)
        let responsedata;
        let product=productdetails;
        let formdata=new FormData();
        formdata.append('product',image);
        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json'
            },
            body:formdata,
        }).then((res)=>res.json()).then((data)=>{responsedata=data})
        if(responsedata.success){
            product.image=responsedata.image_url;
            // console.log(product)
            await fetch('http://localhost:4000/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'content-type':'application/json'
                },
                body:JSON.stringify(product),
            }).then((res)=>res.json()).then((data)=>{
                if(data.success){
                    console.log("saved")
                    setproducts({
                        name:" ",
                        image:" ",
                        category:"women",
                        new_price:" ",
                        old_price:""
                    })
                    setimage(null)
                }
            })
        }

    }
  return (
    <div className="add-product">
        <div className="addproduct-itemfield">
            <p>Product title</p>
            <input value={productdetails.name} onChange={changehandler} type="text" name="name" placeholder='Type here'/>
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input  value={productdetails.old_price} onChange={changehandler}type="text" name="old_price" placeholder='Type here'/>
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input  value={productdetails.new_price} onChange={changehandler}type="text" name="new_price" placeholder='Type here'/>
            </div>
            
        </div>
        <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select  value={productdetails.category} onChange={changehandler}name="category" className="addproduct-selector">
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail'alt="" />
                </label>
                <input onChange={imagehandler}type="file" name='image' id='file-input' hidden/>
            </div>
            <button onClick={()=>{addproduct()}}className="addproduct-btn">ADD</button>
      
    </div>
  )
}

export default Addproduct
