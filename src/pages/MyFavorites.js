import React,{useState, useEffect, useMemo} from 'react';
import MovieCard from '../components/MovieCard';

const MyFavorites=(props)=>{
    const[favorites,setFavorites] = useState([]);

    useEffect(() => {
        // dependency on favorites array, whenever it changes
        fetch('http://localhost:3000/api/favorites')
          .then(response => response.json())
          .then(data => setFavorites(data))
          .catch(error => console.error('Error fetching favorites:', error));
      }, [favorites]);


    
      const favoriteMovies = useMemo(() => {
        // Ensure both favorites array and movieData are available
        if (!favorites || !props.movieData) {
          return [];
        }
    
        // Filter movie data based on favorites array
        return props.movieData.filter((movie) => favorites.includes(movie.id));
      }, [favorites, props.movieData]);

    const favoritesMovieList  = 
        favoriteMovies && 
        favoriteMovies
        .map((movie)=>{
            return (
                <MovieCard 
                movie = {movie}
                key = {movie.id}
                handleFavorite = {props.toggleFavorite}
                />
            )
        })
    return (
        <div>
            <h1>Favourite</h1>
            {favoritesMovieList}
            </div>
    )
}

export default MyFavorites;