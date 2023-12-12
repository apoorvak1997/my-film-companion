import React from 'react';
import MovieCard from '../components/MovieCard';
import '../styles/favoritepage.css';

const MyFavorites=(props)=>{
    const favoritesMovieList  = 
        props.movieData && 
        props.movieData
        .map((movie)=>{
            return (
                //dynamically removes from favorites page when toggled off
                (movie.isFavorite)?
                <MovieCard 
                movie = {movie}
                key = {movie.id}
                handleFavorite = {props.toggleFavorite}
                />
                :""
            )
        })
    return (
        <div>
            <h1> My Favourites</h1>
            <div className="movies--container">
            {favoritesMovieList}
            </div>
            </div>
    )
}

export default MyFavorites;