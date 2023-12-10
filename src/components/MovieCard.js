import React, { useState } from 'react';
import '../styles/moviecard.css';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import Favorite from '../components/Favorite';


export default function MovieCard(props) {
    const { title, overview, release_date, poster_path } = props.movie;
    const [details, setDetails] = useState(false);

    function handleDetails() { setDetails(prevState => !prevState) }

    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w300"
    return (

        <div className='movie-container'>
            {details && <p> {overview} </p>}
            <img src={`${baseImgUrl}/${size}${poster_path}`} alt="img" onClick={handleDetails}/>
            <div className='movie-list'>
            <ul className='movie-name'>
                <li className='movie-item'>{title}</li>
                <li className='movie-item'>{release_date.slice(0,4)}</li>
            </ul>
            <Favorite handleClick={props.toggleHeart}/>
            </div>
        </div>

    )

}