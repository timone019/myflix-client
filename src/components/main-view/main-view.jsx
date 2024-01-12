import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./main-view.scss";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    if (!authToken) {
      return;
    }

    fetch("https://ajmovies-fc7e7627ec3d.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          // Year: movie.Year,
          Genre: {
            Name: movie.Genre.Name,
          },
          Director: {
            Name: movie.Director.Name,
            Bio: movie.Director.Bio,
            Birth: movie.Director.Birth,
          },
          Featured: movie.Featured,
          ImagePath: movie.ImagePath,
        }));

        setMovies(moviesFromApi);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [authToken]);

  const handleLogin = (loggedInUser, authToken) => {
    setUser(loggedInUser);
    setAuthToken(authToken);
  };
  return (
    <Row>
      {!user ? (
        <>
          <Col md={6}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            or
            <SignupView />
          </Col>
        </>
      ) : selectedMovie ? (
        <Col md={8} style={{ border: "1px solid black" }}>
          <MovieView
            style={{ border: "1px solid green" }}
            movie={selectedMovie}
            onBackClicked={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col md={8} key={movie._id}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
      {user && (
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
          }}
          className="logout-button"
          style={{ cursor: "pointer" }}>
          Log out
        </button>
      )}
    </Row>
  );
};
