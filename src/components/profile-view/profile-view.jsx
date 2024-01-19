import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";
import UserInfo from "./user-info";
import { MovieCard } from "../movie-card/movie-card";
import UpdateUser from "./update-user";
import { Link } from "react-router-dom";
import "./profile-view.scss";
import FavoriteMovies from "./favorite-movies";

export function ProfileView({ movies, user, setUser }) {
  // Rename functions for consistency
  // const removeFavorite = (movieId) => {
  //   const updatedList = user.FavoriteMovies.filter((id) => id !== movieId);
  //   setUser((prevUser) => ({ ...prevUser, FavoriteMovies: updatedList }));
  //   console.log(updatedList);
  // };
  console.log(user);
  // const handleUpdate = (event) => {
  //   const { name, value } = event.target;
  //   setUser((prevUser) => ({ ...prevUser, [name]: value }));
  // };

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

        {movies
          .filter((movie) => user.FavoriteMovies.includes(movie._id))
          .map((movie) => (
            <Col className="mb-5" key={movie._id} md={3}>
              <MovieCard movie={movie} />
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default ProfileView;
