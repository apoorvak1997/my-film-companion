import React from "react";
import '../styles/navbar.css';
import {Link} from 'react-router-dom';

export default function NavBar() {
    return(
        <nav className="navbar">
      <ul className="menu_list">
         <li><Link  to="/">Home </Link></li>
          <li><Link to="/favorites">My Favorites</Link></li>
        </ul>
    </nav>
    );
}