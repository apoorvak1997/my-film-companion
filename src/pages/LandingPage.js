import React,{useState,useEffect} from 'react';
import NavBar from '../components/NavBar';
import MovieCard from '../components/MovieCard';
import '../styles/landingpage.css';
import Fuse from 'fuse.js';

export default function LandingPage(){
    const [movieData, setMovieData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState([]);
    const getMovie =()=> fetch("https://api.themoviedb.org/3/movie/popular?api_key=66526fd746a5898fa20fb3094101902e&language=en-US")
    .then(res=>res.json())
    .then(data => {
        setMovieData(data.results);
    });
    useEffect(()=>{
        getMovie()
    },[]);

    function handleSearch(e){
        const value = e.currentTarget.value;
        setSearchQuery(value);

    }

    function addMovieToFavorites(movie){
        movie.on = true;
        const newFavoriteList = [...favorites,movie];
        setFavorites(newFavoriteList);
    }

    function removeMovieFromFavorites(movie){
        const newFavoriteList = favorites.filter(
            (fav) => fav.id !== movie.id
        );
        setFavorites(newFavoriteList);
        movie.on = false;
    }

    function findMovieFromList(movieId){
        const result = movieData.find(({ id }) => id === movieId);
        return result;
        
    }

    function toggleFavorite(id) {
        const findMovie = findMovieFromList(id);
        (findMovie.on) ? removeMovieFromFavorites(findMovie) : addMovieToFavorites(findMovie)
        
    }

    

    const fuse = new Fuse(movieData, {
        keys:["title"]
    })
    const results = fuse.search(searchQuery);
    const moviesArray = searchQuery ? results.map(result => result.item) : movieData

    const movieList  = (data) =>
        data
        .sort((a,b) => a.release_date < b.release_date ? 1: -1)
        .map((movie)=>{
            return (
                <MovieCard 
                movie = {movie}
                key = {movie.id}
                handleFavorite = {toggleFavorite}
                />
            )
        })

    return(
        <div>
        <NavBar/>
        <input className = "search-movies" type="search" placeholder = "search movies" value = {searchQuery} onChange={handleSearch}/>
        
        <div className="movies-container">
            {movieList(moviesArray)}
        </div>
        <br></br>
        <p>Favorites</p>
        <div className="movies-container">
        {movieList(favorites)}
        </div>


        </div>
        
    )
}