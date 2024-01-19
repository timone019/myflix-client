import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";
import UserInfo from "./user-info";
import UpdateUser from "./update-user";
import { Link } from "react-router-dom";
import "./profile-view.scss";

export function ProfileView({ token }) {
  const [user, setUser] = useState({
    Username: "",
    Email: "",
    FavoriteMovies: [],
  });

  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (!token) {
      return;
    }

    // Fetch user
    fetch(`https://ajmovies-fc7e7627ec3d.herokuapp.com/users`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUser({
          ...user,
          Username: data.Username,
          Email: data.Email,
          FavoriteMovies: data.FavoriteMovies,
        });
        setLoadingUser(false); // Set loading state to false
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoadingUser(false); // Set loading state to false in case of an error
      });
  }, [token]);

  // Fetch movies separately
  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://ajmovies-fc7e7627ec3d.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        return response.json();
      })
      .then((moviesData) => {
        console.log("Movies data:", moviesData);
        setMovies(moviesData); // Update movies prop with the latest data
        setFavoriteMoviesList(moviesData);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  // Rename functions for consistency
  const removeFavorite = (movieId) => {
    const updatedList = user.FavoriteMovies.filter((id) => id !== movieId);
    setUser((prevUser) => ({ ...prevUser, FavoriteMovies: updatedList }));
    console.log(updatedList);
  };

  const handleUpdate = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.Username} email={user.Email} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser user={user} setUser={setUser} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h2>Favorite Movies</h2>

      {user.FavoriteMovies.map((movieId) => {
        const movie = movies.find((m) => m._id === movieId);
        if (movie) {
          return (
            <div key={movie._id}>
              <img src={movie.ImagePath} alt={movie.Title} />
              <Link to={`/movies/${movie._id}`}>
                <h4>{movie.Title}</h4>
              </Link>
              <Button
                variant="secondary"
                onClick={() => removeFavorite(movie._id)}>
                Remove from list
              </Button>
            </div>
          );
        }
        return null; // Handle the case where the movie with movieId is not found
      })}

      <Form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
        <h2>Want to change some info?</h2>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            defaultValue={user.Username}
            onChange={(e) => handleUpdate(e)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            defaultValue={user.Password}
            onChange={(e) => handleUpdate(e)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            defaultValue={user.Email}
            onChange={(e) => handleUpdate(e)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
}

export default ProfileView;
