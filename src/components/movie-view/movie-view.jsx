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
    const foundMovie = movies.find((m) => m.Title === title);
    setMovie(foundMovie);

    if (foundMovie) {
      const similarMoviesList = movies.filter(
        (m) =>
          m.Genre.Name === foundMovie.Genre.Name && m._id !== foundMovie._id
      );
      setSimilarMovies(similarMoviesList);
      setIsFav(user.FavoriteMovies.includes(foundMovie._id));
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
              <iframe
                src={movie.TrailerPath.replace("watch?v=", "embed/")}
                title="Movie trailer"
                aria-label="trailer"
                allowFullScreen
                className="Trailer-button">
                Watch Trailer
              </iframe>
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
            <div style={{ textAlign: "auto" }}>
              <h2>Similar movies</h2>
              <Container className="mb-3">
                <Row>
                  {similarMovies.map((movie) => (
                    <Col
                      md={3}
                      key={`${movie._id}-${isFav}`}
                      className="movie-card">
                      <MovieCard
                        movie={movie}
                        addFav={addFav}
                        removeFav={removeFav}
                        isFav={favMovies.includes(movie._id)}
                      />
                    </Col>
                  ))}
                </Row>
              </Container>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

MovieView.propTypes = {
  user: PropTypes.object.isRequired,
  addFav: PropTypes.func.isRequired,
  removeFav: PropTypes.func.isRequired,
  favMovies: PropTypes.array.isRequired,
  movies: PropTypes.array.isRequired,
};
