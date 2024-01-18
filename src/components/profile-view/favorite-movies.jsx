import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const FavoriteMovies = ({ favoriteMoviesList, removeFav }) => {
  // Add logic to fetch favorite movies or receive props

  return (
    <div>
      <h2>Favorite Movies</h2>
      {favoriteMoviesList.map((movie) => (
        <div key={movie._id}>
          <img src={movie.ImagePath} alt={movie.Title} />
          <Link to={`/movies/${movie._id}`}>
            <h4>{movie.Title}</h4>
          </Link>
          <Button variant="secondary" onClick={() => removeFav(movie._id)}>
            Remove from list
          </Button>
        </div>
      ))}
    </div>
  );
};

export default FavoriteMovies;
