import React, { useState } from "react";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";
import UserInfo from "./user-info";
import UpdateUser from "./update-user";
import { Link } from "react-router-dom";
import "./profile-view.scss";
import { MovieCard } from "../movie-card/movie-card";
import FavoriteMovies from "./favorite-movies";

export function ProfileView({ movies, setUser, user, token }) {
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState(user.password);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);

  const favMov = user.favoriteMovies
    ? movies.filter((movie) => user.favoriteMovies.includes(movie._id))
    : [];

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = { name, password, email, birthday }; // Assuming these are the fields you want to update

    fetch(`https://ajmovies-fc7e7627ec3d.herokuapp.com/users/${user.name}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        console.log(response);
        if (response.ok) {
          const updatedUser = await response.json();
          alert("updated!");
          if (updatedUser) {
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
          }
        } else {
          const e = await response.text();
          console.log(e);
          alert("Update failed.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = () => {
    fetch(`https://ajmovies-fc7e7627ec3d.herokuapp.com/users/${user.name}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        setUser(null);
        alert("Your account has been deleted");
      } else {
        alert("something went wrong.");
      }
    });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mx-3 my-4">
        <h2 className="profile-title">Favorite movies</h2>
        <FavoriteMovies
          favoriteMoviesList={favMov}
          token={token}
          setUser={setUser}
          user={user}
        />
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="profile-title">Update info</h2>
          <Form className="my-profile" onSubmit={handleUpdate}>
            <Form.Group className="mb-2" controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="update" type="submit" onClick={handleUpdate}>
              Update
            </Button>
            <Button className="delete" onClick={handleDelete}>
              Delete Account
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
