import React from 'react';
// search as its own component
export default function Search(props) {
    return (
    <input
                type="search"
                onChange={(e) => props.handleSearch(e.target.value)}
                placeholder="Search Movies"
                /> 

    );
}