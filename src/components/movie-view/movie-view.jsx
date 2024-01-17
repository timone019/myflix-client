import React, { useState, useEffect } from "react";
import "./movie-view.scss";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export const MovieView = ({ token }) => {
  const { movieid } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    // Fetch the movie from your API using the movieid
    fetch(`https://myflix-movies.herokuapp.com/movies/${movieid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      });
    // Fetch similar movies
    fetch(`https://myflix-movies.herokuapp.com/movies/${movieid}/similar`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSimilarMovies(data);
      });
  }, [movieid, token]);

  if (!movie) return null;

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={movie.ImagePath}
          alt={movie.Title}
          style={{ width: "500px" }}
        />
      </div>
      <br />
      <div>
        <span>
          <h1> {movie.Title}</h1>
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
        {/* ...existing code... */}
        <div>
          <h2>Similar Movies</h2>
          {similarMovies.map((similarMovie) => (
            <div key={similarMovie._id}>
              <h3>{similarMovie.Title}</h3>
              <img src={similarMovie.ImagePath} alt={similarMovie.Title} />
            </div>
          ))}
        </div>
      </div>
      <br />
      <Link to="/" className="back-button" style={{ cursor: "pointer" }}>
        Back
      </Link>
    </div>
  );
};
MovieView.propTypes = {
  token: PropTypes.string.isRequired,
  MovieView: PropTypes.shape({
    _id: PropTypes.string,
    Title: PropTypes.string,
    Description: PropTypes.string,
    Year: PropTypes.number,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
    }),
  }),
};
