import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MyFavorites from './pages/MyFavorites';
import NavBar from './components/NavBar';

function App() {

  const [movieData, setMovieData] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    //get popular movies from API -
    const fetchMovies = () => {
      fetch("https://api.themoviedb.org/3/movie/popular?api_key=66526fd746a5898fa20fb3094101902e&language=en-US")
        .then(res => res.json())
        .then(data => {

          const updatedMoviesWithFavorites = data.results.map(movie => ({
            ...movie,
            isFavorite: favorites.includes(movie.id) ? true : false,
          }))
          setMovieData(updatedMoviesWithFavorites.sort((a, b) => a.release_date < b.release_date ? 1 : -1));
        }).catch(error => {
          //change to error object to display on UI
          console.error('Error fetching popular movies:', error);
        });

    }
    fetchMovies();
  }, []);

  //filter favorite Movie Data, to pass down to child MyFavorites
  useEffect(() => {
    setFavoriteMovies(movieData.filter((movie) => favorites.includes(movie.id)));
  }, [favorites, movieData]
  )

  function toggleFavorite(movieId) {
    const updatedFavorites = favorites.includes(movieId)
      ? favorites.filter(id => id !== movieId)
      : [...favorites, movieId];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    setMovieData((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId ? { ...movie, isFavorite: !movie.isFavorite } : movie
      )
    );

  }

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <div>
            <NavBar />
            <Routes>
              <Route path='/' element={<LandingPage movieData={movieData} toggleFavorite={toggleFavorite} />} />
              <Route path='/favorites' element={<MyFavorites movieData={favoriteMovies} toggleFavorite={toggleFavorite} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
