import React,{useState,useEffect} from 'react';
import MovieCard from '../components/MovieCard';
import '../styles/landingpage.css';
import Fuse from 'fuse.js';

export default function LandingPage(props){
    const [searchQuery, setSearchQuery] = useState('');

    function handleSearch(e){
        const value = e.currentTarget.value;
        setSearchQuery(value);

    }

    const fuse = new Fuse(props.movieData, {
        keys:["title"],
        threshold: 0.4,
        ignoreLocation: true,
        location: 0,
        distance: 100
    })
    const results = fuse.search(searchQuery);
    const moviesArray = searchQuery ? results.map(result => result.item) : props.movieData

    const movieList  = (data) =>
        data
        .map((movie)=>{
            return (
                <MovieCard 
                movie = {movie}
                key = {movie.id}
                handleFavorite = {props.toggleFavorite}
                />
            )
        })

    return(
        <div>
        <input className = "search-movies" type="search" placeholder = "search movies" value = {searchQuery} onChange={handleSearch}/>
        
        <div className="movies-container">
            {movieList(moviesArray)}
        </div>
        <br></br>
        </div>
        
    )
}