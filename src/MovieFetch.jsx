import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import './index.css'
import SearchIcon from '@mui/icons-material/Search';


const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const MovieFetch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
      searchMovies('batman');
  }, [searchTerm]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>Movie Finder</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <button
          onClick={() => searchMovies(searchTerm)}
        ><SearchIcon className="searchBtn"/></button>
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default MovieFetch;
