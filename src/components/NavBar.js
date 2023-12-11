import React from "react";
import '../styles/navbar.css';
import {Link} from 'react-router-dom';

export default function NavBar() {
    return(
        <nav className="navbar">
      <div className="nav-logo">
         <Link to="/">Home </Link>
      </div>
      <div>
        <ul className="menu_list">
          <li><Link to="/favorites">My Favorites</Link></li>
        </ul>
      </div>
    </nav>
    );
}