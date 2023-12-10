import React,{useState,useEffect} from 'react';
import NavBar from '../components/NavBar';
import MovieCard from '../components/MovieCard';
import '../styles/landingpage.css';
import Fuse from 'fuse.js';

export default function LandingPage(){
    const [movieData, setMovieData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
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
    
    const fuse = new Fuse(movieData, {
        keys:["title"]
    })
    const results = fuse.search(searchQuery);
    const moviesArray = searchQuery ? results.map(result => result.item) : movieData

    const movieList = 
        moviesArray
        .sort((a,b) => a.release_date < b.release_date ? 1: -1)
        .map((movie)=>{
            return (
                <MovieCard 
                movie = {movie}
                key = {movie.id}
                />
            )
        })

    return(
        <div>
        <NavBar/>
        <input className = "search-movies" type="search" placeholder = "search movies" value = {searchQuery} onChange={handleSearch}/>
        <div className="movies-container">
        {movieList}
        </div>
        </div>
        
    )
}