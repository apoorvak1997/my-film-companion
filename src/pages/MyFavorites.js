import React,{useMemo} from 'react';
import MovieCard from '../components/MovieCard';
import '../styles/favoritepage.css';

const MyFavorites=(props)=>{
    const favorites = props.favorites;
    const movieData = props.movieData;
   

      const favoriteMovies = useMemo(() => {
        // Ensure both favorites array and movieData are available
        if (!favorites || !movieData) {
          return [];
        }
    
        // Filter movie data based on favorites array
        return movieData.filter((movie) => favorites.includes(movie.id));
      }, [favorites, movieData]);

    const favoritesMovieList  = 
        favoriteMovies && 
        favoriteMovies
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