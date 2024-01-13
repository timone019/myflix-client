import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // connect app to api with hook
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://ajmovies-fc7e7627ec3d.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movie) => {
        console.log(movie);
        const moviesFromApi = movie.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          ImagePath: movie.ImagePath,
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
          Featured: movie.Featured,
        }));

        setMovies(moviesFromApi);
      });

    // .catch((error) => console.error("Error fetching movies:", error));
  }, [token]);

  return (
    <Row className="justify-content-md-center mb-5">
      {!user ? (
        <>
          <Col md={3}>
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
