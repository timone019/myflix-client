import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://ajmovies-fc7e7627ec3d.herokuapp.com/movies")
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          Year: movie.Year,
          Genre: {
            Name: movie.Genre.Name,
          },
          Director: {
            Name: movie.Director.Name,
            Bio: movie.Director.Bio,
            Birth: movie.Director.Birth,
          },
        }));
        setMovies(moviesFromApi);
      });
  }, []);

  if (selectedMovie) {
    // Placeholder comment: Complete the logic for filtering similar movies
    let similarMovies = movies.filter(
      (movie) => movie.Genre.Name === selectedMovie.Genre.Name
    );

    return (
      <>
        <MovieView
          movie={selectedMovie}
          onBackClicked={() => {
            setSelectedMovie(null);
          }}
        />
        <hr />
        <h2>Similar Movies</h2>
        {similarMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <button
        onClick={() => {
          alert("Nice!");
        }}>
        Click me!
      </button>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
