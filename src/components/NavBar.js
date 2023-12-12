import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Hidden } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{backgroundColor:"#f1f1f1"}}>
      <Toolbar>
        
        <Hidden mdUp>
          {/* Hamburger icon on screens < md */}
          <IconButton
            size="large"
            edge="end"
            color="black"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="navbar-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
            <Link to="/" style={{ textDecoration: 'none', color: 'black', textTransform: 'uppercase', fontWeight: location.pathname === '/' ? 'bold' : 'normal' }}>
                Home
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
            <Link to="/favorites" style={{ textDecoration: 'none', color: 'black', textTransform: 'uppercase', fontWeight: location.pathname === '/favorites' ? 'bold' : 'normal' }}>
                My Favorites
              </Link>
            </MenuItem>
          </Menu>
        </Hidden>
        <Hidden  mdDown>
          {/* Links on screens >= md */}
          <Typography variant="h6" style={{ marginRight: '1rem' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'black', textTransform: 'uppercase', fontWeight: location.pathname === '/' ? 'bold' : 'normal' }}>
              Home
            </Link>
          </Typography>
          <Typography variant="h6" style={{ marginRight: '1rem' }}>
          <Link to="/favorites" style={{ textDecoration: 'none', color: 'black', textTransform: 'uppercase', fontWeight: location.pathname === '/favorites' ? 'bold' : 'normal' }}>
              My Favorites
            </Link>
          </Typography>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;