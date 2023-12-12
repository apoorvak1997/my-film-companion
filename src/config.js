const POPULAR_MOVIES_ENDPOINT = 'https://api.themoviedb.org/3/movie/popular';
const LANGUAGE = 'en-US';
const BASEIMGURL = "https://image.tmdb.org/t/p"
const SIZE = "w300"
const TOTAL_PAGES = 10
const API_KEY = process.env.REACT_APP_TMDB_API_KEY

export { API_KEY, POPULAR_MOVIES_ENDPOINT, LANGUAGE, BASEIMGURL, SIZE, TOTAL_PAGES };