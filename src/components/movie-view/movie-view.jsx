import React, { useState, useEffect } from "react";
import "./movie-view.scss";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { Container, Col, Row, Card } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ user, addFav, removeFav, favMovies, movies }) => {
  const { title } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const movie = movies.find((m) => m.Title === title);
    setMovie(movie);

    if (movie) {
      const similarMovies = movies.filter(
        (m) => m.Genre.Name === movie.Genre.Name && m._id !== movie._id
      );
      setSimilarMovies(similarMovies);
      setIsFav(user.FavoriteMovies.includes(movie._id));
    }
  }, [title, movies, user]);

  const handleAddFav = (movieId) => {
    addFav(movieId);
    setIsFav(true);
  };
  const handleRemoveFav = (movieId) => {
    removeFav(movieId);
    setIsFav(false);
  };

  return (
    <>
      {movie && (
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              className="movie-image"
              src={movie.ImagePath}
              alt={movie.Title}
            />
          </div>
          <div>
            {isFav ? (
              <HeartFill
                color="red"
                size={20}
                className="fav-button mt-2 me-2 top-0 end-0"
                onClick={() => handleRemoveFav(movie._id)}
              />
            ) : (
              <Heart
                color="red"
                size={20}
                className="fav-button mt-2 me-2 top-0 end-0"
                onClick={() => handleAddFav(movie._id)}
              />
            )}
          </div>
          <br />
          <div className="movie-view">
            <h1>{movie.Title}</h1>
            {/* Other movie view content */}
          </div>
          <div>
            <span>Year: </span>
            <span>
              <h1>{movie.Year}</h1>
            </span>
          </div>
          <div>
            <span>
              <a
                href={movie.TrailerPath}
                target="_blank"
                rel="noopene noreferrer"
                className="Trailer-button">
                Watch Trailer
              </a>
            </span>
          </div>
          <div>
            <span>Director: </span>
            <span>{movie.Director.Name}</span>
          </div>
          <div>
            <span>Genre: </span>
            <span>{movie.Genre.Name}</span>
          </div>
          <br />
          <p style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span>{movie.Description}</span>
          </p>

          <div style={{ textAlign: "center" }}>
            <div style={{ textAlign: "left" }}>
              <h2>Similar Movies</h2>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                }}>
                {similarMovies.map((similarMovie) => (
                  <div key={similarMovie._id} style={{ margin: "10px" }}>
                    <h3>{similarMovie.Title}</h3>
                    <img
                      src={similarMovie.ImagePath}
                      alt={similarMovie.Title}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <br />
          <Link to="/" className="back-button" style={{ cursor: "pointer" }}>
            Back
          </Link>
        </div>
      )}
    </>
  );
};

MovieView.propTypes = {
  addFav: PropTypes.func.isRequired,
  removeFav: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
};
