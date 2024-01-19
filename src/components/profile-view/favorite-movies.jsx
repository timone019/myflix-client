import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

const FavoriteMovies = ({ user, removeFav }) => {
  const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = "your_token_here"; // Replace with your actual token

    fetch("https://ajmovies-fc7e7627ec3d.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredMovies = data.filter((movie) =>
          user.FavoriteMovies.includes(movie._id)
        );
        setFavoriteMoviesList(filteredMovies);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [FavoriteMovies]);

  return (
    <div>
      <h2>Favorite Movies</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        favoriteMoviesList.map((movie) => (
          <div key={movie._id}>
            <img src={movie.ImagePath} alt={movie.Title} />
            <Link to={`/movies/${movie._id}`}>
              <h4>{movie.Title}</h4>
            </Link>
            <Button variant="secondary" onClick={() => removeFav(movie._id)}>
              Remove from list
            </Button>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoriteMovies;
