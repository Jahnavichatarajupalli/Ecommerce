import React from 'react'
import './items.css'
import {Link} from 'react-router-dom'

const items = (props) => {
  return (
    <div className="item">
        <div className="image">
            <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)}src={props.image} alt="" /></Link>
        </div>
        <div className="textimage">
            <p>{props.name}</p>
        </div>
        <div className="price">
            <p className="new">{'$'+props.newprice}</p>
            <p className="old">{'$'+props.oldprice}</p>

        </div>
      
    </div>
  )
}

export default items
