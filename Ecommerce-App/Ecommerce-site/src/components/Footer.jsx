import React from 'react'
import image from "../assets/Ecommerce-logo.jpg"
import { Link } from "react-router-dom";
const Footer = () => {
  
    return (
    <div>
        <div>
            <img src={image}/>
        </div>
        <div>
            <ul>
                <li>
                    <Link to="/">Products</Link>
                </li>
                <li>
                    <Link to="/">Customer Reviews</Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Footer