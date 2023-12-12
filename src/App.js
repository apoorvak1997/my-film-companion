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

  useEffect(() => {
    // clear local storage when app starts
    
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
    // const fetchFavorites = () => {
    //   // dependency on favorites array, whenever it changes
    //   fetch('http://localhost:3000/api/favorites')
    //     .then(response => response.json())
    //     .then(data => setFavorites(data))
    //     .catch(error => console.error('Error fetching favorites:', error));
    // }

    fetchMovies();
    // fetchFavorites();
    // console.log("local storage clearedddd!");
    // localStorage.clear();
  }, []);



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

    fetch('http://localhost:3000/api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ favorites: updatedFavorites }),
    })
      .catch(error => console.error('Error saving to favorites:', error));

  }

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <div>
            <NavBar />
            <Routes>
              <Route path='/' element={<LandingPage movieData={movieData} toggleFavorite={toggleFavorite} />} />
              <Route path='/favorites' element={<MyFavorites movieData={movieData} favorites={favorites} toggleFavorite={toggleFavorite} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
