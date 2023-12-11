import logo from './logo.svg';
import './App.css';
import React,{useState,useEffect} from 'react';
import { Route,BrowserRouter,Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MyFavorites from './pages/MyFavorites';
import NavBar from './components/NavBar';

function App() {

  const [movieData, setMovieData] = useState([]);
  const [favorites, setFavorites] = useState((localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')):[]));

  
  useEffect(()=>{
      //get popular movies from API
      fetch("https://api.themoviedb.org/3/movie/popular?api_key=66526fd746a5898fa20fb3094101902e&language=en-US")
      .then(res=>res.json())
      .then(data => {
      const local = localStorage.getItem('favorites');
       const getFavorites = (!local) ? JSON.parse(local): [];

      const updatedMoviesWithFavorites = data.results.map(movie => ({
          ...movie,
          isFavorite : favorites.includes(movie.id) ?true : false ,
      }))
      setMovieData(updatedMoviesWithFavorites.sort((a,b) => a.release_date < b.release_date ? 1: -1));
  });

  },[]);


  function toggleFavorite(movieId) {
    console.log(favorites);
    console.log("toggle",movieId);
    console.log(favorites.includes(movieId));
    const updatedFavorites = favorites.includes(movieId)
    ? favorites.filter(id => id !== movieId)
    : [...favorites, movieId];

    console.log("updatedFavorites",updatedFavorites)
    setFavorites(updatedFavorites);

    console.log("after setting favs",favorites);

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
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error saving to favorites:', error));
    
}




  return (

    
    <>
    <div className="App">
    <BrowserRouter>
            <div>
              <NavBar />
              <Routes>
                <Route path='/' element={<LandingPage movieData={movieData} toggleFavorite = {toggleFavorite}/>} />
                <Route path='/favorites' element={<MyFavorites movieData={movieData} toggleFavorite ={toggleFavorite} />}/>
              </Routes>
            </div>
          </BrowserRouter>
        </div>
    </>
  );
}

export default App;
