import React from "react";
import "./movie-card.scss";
import PropTypes from "prop-types";
import { Button, Card, Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie._id}`}>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={movie.ImagePath}
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
            height: "auto",
          }}
        />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
        </Card.Body>

        <Card.Footer>
          <Link to={`/movies/${movie._id}`}>
            <Button>Open</Button>
          </Link>
        </Card.Footer>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
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
