import React from 'react'
import './productdisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import {useState,useContext} from 'react'
import Description from '../description/description.js'
import Related from '../relatedproducts/relatedproducts.js'
import { shopcontext } from '../../context/shopcontext.js'
import {Link} from 'react-router-dom'
// import allproducts from '../Assets/all_product.js'

const Productdisplay = (props) => {
    const[img,setimg]=useState(props.product.image)
    const {addtocart}=useContext(shopcontext)
   
    
   
    // const [borders,setborder]=useState(true)
  return (
    <>

    <div className="productdisplay">
        <div className="productleft">
            <div className="product-img-list">
                <img  style={{border: img === props.product.image ? '2px solid black':'none'}}src={props.product.image} alt="" />
                <img onClick={()=>{setimg(props.product.image)}
                    } style={{border:img === props.product.image ? '2px solid black':'none'}} src={props.product.image} alt="" />
                <img  onClick={()=>{setimg(props.product.image)}
                 } style={{border: img === props.product.image ? '2px solid black':'none'}} src={props.product.image} alt="" />
                <img  onClick={()=>{setimg(props.product.image)
                    }} style={{border: img === props.product.image ? '2px solid black':'none'}} src={props.product.image} alt="" />
            </div>
            <div className="product-img"><img className='productdisplay-main-img'src={props.product.image} alt="" /></div>
        </div>
        <div className="productright">
            <h1>{props.product.name}</h1>
            <div className="product-right-star">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className="product-prices">
                <div className="product-price-old">{'$'+props.product.old_price}</div>
                <div className="product-price-new">{'$'+props.product.new_price}</div>
                
            </div>
            <div className="product-right-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis nulla velit, dicta sed incidunt debitis ducimus sit deserunt modi quisquam sunt quod asperiores enim.
            </div>
            <div className="product_size">
                <h1>Select Size</h1>
                <div className="sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>


                </div>
            </div>
           <Link to='/cart' ><button onClick={()=>{addtocart(props.product.id)}}>ADD TO CART</button></Link>
            <p className="product-category"><span>Category:</span>Women,T-Shirt,Crop Top</p>
            <p className="product-category"><span>Tags:</span>Modern,Latest</p>

        </div>
        </div>
        <Description></Description>
        <Related></Related>
        </>
      
    
  )
}

export default Productdisplay
