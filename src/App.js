import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MyFavorites from './pages/MyFavorites';
import NavBar from './components/NavBar';
import {POPULAR_MOVIES_ENDPOINT, LANGUAGE} from './config';

function App() {

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const [movieData, setMovieData] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const fetchMovies = async(pageNumber) => {
    const res = await fetch(`${POPULAR_MOVIES_ENDPOINT}?api_key=${API_KEY}&language=${LANGUAGE}&page=${pageNumber}`);
    if(res.ok){
      const data = await res.json();
      const updatedMoviesWithFavorites = data.results.map(movie => ({
        ...movie,
        isFavorite: favorites.includes(movie.id) ? true : false,
      }));
      setMovieData(updatedMoviesWithFavorites.sort((a, b) => a.release_date < b.release_date ? 1 : -1))
    }else {
        //change to error object to display on UI
        console.error('Error fetching popular movies:');
        return;
      }
  }

  useEffect(() => {
    //get popular movies from API -   
    fetchMovies(currentPageNumber);
  }, [currentPageNumber]);

  //filter favorite Movie Data, to pass down to child MyFavorites
  useEffect(() => {
    setFavoriteMovies(movieData.filter((movie) => favorites.includes(movie.id)));
  }, [favorites, movieData]
  )

  function onPageChange(event,value) {
    //handling pagination
    setCurrentPageNumber(value);
  }

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
              <Route path='/' element={<LandingPage movieData={movieData} toggleFavorite={toggleFavorite} handlePageChange={onPageChange} currentPageNumber={currentPageNumber}/>} />
              <Route path='/favorites' element={<MyFavorites movieData={favoriteMovies} toggleFavorite={toggleFavorite} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
