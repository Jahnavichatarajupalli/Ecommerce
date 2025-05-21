import React from 'react'
import './offers.css'
import offer from '../Assets/exclusive_image.png'
const populars = () => {
  return (
    <div className="offers">
        <div className="offer-left">
            <div className="exclusive">
                <p>Exclusive</p>
                <p>Offers For You</p>
            </div>
            <div className="products">ONLY ON BEST SELLERS PRODUCTS</div>
            <div className="check">
                <button>Check Now</button>
            </div>

        </div>
        <div className="offer-right">
            <img src={offer} alt="" />

        </div>
      
    </div>
  )
}

export default populars
