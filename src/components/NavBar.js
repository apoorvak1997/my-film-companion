import React from "react";
import '../styles/navbar.css';

export default function NavBar() {
    return(
        <nav className="navbar">
      <div className="nav-logo">
         Home
      </div>
      <div>
        <ul className="menu_list">
          <li>My Favorites</li>
        </ul>
      </div>
    </nav>
    );
}