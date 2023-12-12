import React, { useState } from 'react';
import MovieCard from '../components/MovieCard';
import '../styles/landingpage.css';
import Fuse from 'fuse.js';
import { TOTAL_PAGES } from '../config';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function LandingPage(props) {
    console.log(props.currentPageNumber);
    const [searchQuery, setSearchQuery] = useState('');

    function handleSearch(e) {
        const value = e.currentTarget.value;
        setSearchQuery(value);

    }

    const fuse = new Fuse(props.movieData, {
        keys: ["title"],
        threshold: 0.4,
        ignoreLocation: true,
        location: 0,
        distance: 100
    })
    const results = fuse.search(searchQuery);
    const moviesArray = searchQuery ? results.map(result => result.item) : props.movieData

    const movieList = (data) =>
        data
            .map((movie) => {
                return (
                    <MovieCard
                        movie={movie}
                        key={movie.id}
                        handleFavorite={props.toggleFavorite}
                    />
                )
            })

    return (
        <div>
            <input className="search-movies" type="search" placeholder="search movies" value={searchQuery} onChange={handleSearch} />

            <div className="movies--container">
                {movieList(moviesArray)}
            </div>
            <div className="pagination">
                <p>Page {props.currentPageNumber} of {TOTAL_PAGES}</p>
                <Stack spacing={2}>
                    <Pagination count={TOTAL_PAGES} page={props.currentPageNumber} shape="rounded" onChange={props.handlePageChange} />
                </Stack>
            </div>
            <br></br>
        </div>

    )
}