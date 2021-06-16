import React from 'react';
import '../NotFound.css'
import { Link, NavLink } from "react-router-dom";

const NotFound = () => {
    return (<h1><h1>404 Error Page</h1>
        <p class="zoom-area">Page not found </p>
        <section class="error-container">
          <span>4</span>
          <span><span class="screen-reader-text">0</span></span>
          <span>4</span>
        </section>
        <div class="link-container">
          <NavLink  to="/shop" className="more-link">Home page</NavLink>
        </div></h1>)

}

export default NotFound;
