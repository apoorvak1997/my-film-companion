import React from 'react';
import '../styles/favorite.css';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Heart from '@mui/icons-material/Favorite';

export default function Favorite(props){

    // function handleClick(e){
    //     e.preventDefault();
    //     setFillHeart(prevState=> !prevState);
    // }
    return (
        <div className ="favorite-icon" onClick ={props.handleClick}>
            {(props.isFavorite) ? <Heart/> :<FavoriteBorder/> }
            </div>
    )
}