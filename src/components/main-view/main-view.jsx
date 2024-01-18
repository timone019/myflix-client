import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./main-view.scss";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  useParams,
} from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Container } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [movies, setMovies] = useState([]);

  // connect app to api with hook
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://ajmovies-fc7e7627ec3d.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        console.log(movies);
        const moviesFromApi = movies.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          ImagePath: movie.ImagePath,
          Description: movie.Description,
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
  }, [token]);

  return (
    <BrowserRouter>
      <Container>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        />

        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView
                        onSignup={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />

            <Route path="/profile" element={<ProfileView user={user} />} />

            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/movies/:title"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <MovieView
                      token={token}
                      movies={movies.find(
                        (movie) => movie.Title === useParams().title
                      )}
                    />
                  )}
                </>
              }
            />

            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <>
                      {movies.map((movie) => (
                        <Col className="mb-5" key={movie._id} md={3}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
        {user && (
          <footer className="d-flex justify-content-center align-items-center">
            <button
              onClick={() => {
                localStorage.clear();
                setUser(null);
                setToken(null);
              }}
              className="logout-button md-4 mb-3"
              style={{ cursor: "pointer", width: "100px", height: "40px" }}>
              Log out
            </button>
          </footer>
        )}
      </Container>
    </BrowserRouter>
  );
};
