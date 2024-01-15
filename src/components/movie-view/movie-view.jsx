import React, { useState } from "react";
import "./movie-view.scss";
import PropTypes from "prop-types";
export const MovieView = ({ movie, onBackClick }) => {
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
        {/* <span>Description: </span> */}
        <span>{movie.Description}</span>
      </p>
      <br />
      <button
        onClick={onBackClick}
        className="back-button"
        style={{ cursor: "pointer" }}>
        Back
      </button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
