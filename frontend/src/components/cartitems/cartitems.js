import React from 'react'
import remove_icon from '../Assets/cart_cross_icon.png'
import {useContext} from 'react'
import { shopcontext } from '../../context/shopcontext.js'
import './cartitem.css'

const Cartitems = () => {
    const {all_products, cartitem, removecart,getTotalCart} = useContext(shopcontext);

    // console.log("All products:", all_products);
    // console.log("Cart items:", cartitem);

    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>products</p>
                <p className="name">Title</p>
                <p>price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_products.map((e) => {
                if (cartitem[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} className="product-icon"alt={e.name} />
                                <p className="name hii">{e.name}</p>
                                <p id="adjust">${e.new_price}</p>
                                <button className="quantity">{cartitem[e.id]}</button>
                                <p>${e.new_price * cartitem[e.id]}</p>
                                <img className="remove-icon"
                                    src={remove_icon} 
                                    alt="Remove" 
                                    onClick={() => removecart(e.id)} 
                                />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null; // If no items are to be displayed, return null
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCart()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Fee</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCart()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code ,Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder="promo code" />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cartitems
