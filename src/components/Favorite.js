import React,{useState} from 'react';
import '../styles/favorite.css';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Heart from '@mui/icons-material/Favorite';

export default function Favorite(){

    const [fillHeart, setFillHeart] = useState(false);

    function handleClick(e){
        e.preventDefault();
        setFillHeart(prevState=> !prevState);
    }

    return (
        <div className ="favorite-icon" onClick ={handleClick}>
            {(fillHeart) ? <Heart/> :<FavoriteBorder/> }
            </div>
    )
}