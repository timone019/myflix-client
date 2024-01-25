import { useState, useEffect } from "react";
import "./main-view.scss";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Container, Col, Row } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [movies, setMovies] = useState([]);
  const { title } = useParams();
  const [favMovies, setFavMovies] = useState([]);
  const addFav = (movieId) => {
    setFavMovies((prevFavMovies) => [...prevFavMovies, movieId]); // Add the movieId to the array ([...favMovies, movieId]);

    fetch(
      `https://ajmovies-fc7e7627ec3d.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setFavMovies(data.FavoriteMovies);
      })
      .catch((error) => {
        console.error("Error adding favorite:", error);
      });
  };
  const removeFav = (movieId) => {
    // setFavMovies((prevFavMovies) => [(prevFavMovies) => id !== movieId]);
    // ); // Remove the movieId from the array (favMovies.filter((id) => id !== movieId))

    fetch(
      `https://ajmovies-fc7e7627ec3d.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setFavMovies(data.FavoriteMovies);
      })
      .catch((error) => {
        console.error("Error removing favorite:", error);
      });
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    // Fetch the user's favorite movies
    fetch(
      `https://ajmovies-fc7e7627ec3d.herokuapp.com/users/${user.Username}}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setFavMovies(data.FavoriteMovies);
      })
      .catch((error) => console.error("Error:", error));

    fetch("https://ajmovies-fc7e7627ec3d.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        console.log(movies);
        const moviesFromApi = movies.map((movie) => {
          return {
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
          };
        });

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
                          setFavMovies(user.FavoriteMovies);
                        }}
                      />
                    </Col>
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
                    <Col> The list is empty!</Col>
                  ) : (
                    <>
                      {movies.map((movie) => (
                        <Col className="mb-4" key={movie._id} md={3}>
                          <MovieCard
                            movie={movie}
                            isFav={favMovies.includes(movie._id)}
                            addFav={addFav}
                            removeFav={removeFav}
                          />
                        </Col>
                      ))}
                    </>
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
                    <Col> The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView
                        addFav={addFav}
                        removeFav={removeFav}
                        token={token}
                        movie={movies.find((movie) => movie.Title === title)}
                        movies={movies}
                        user={user}
                        favMovies={favMovies}
                      />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path="/profile"
              element={
                <ProfileView
                  user={user}
                  setUser={setUser}
                  movies={movies}
                  addFav={addFav}
                  removeFav={removeFav}
                  favMovies={favMovies}
                />
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
              Logout
            </button>
          </footer>
        )}
      </Container>
    </BrowserRouter>
  );
};
