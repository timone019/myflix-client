import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Card.Text>{movie.Year}</Card.Text>
        <Card.Text>{movie.Genre && movie.Genre.Name}</Card.Text>
        <Card.Text>{movie.Director && movie.Director.Name}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
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
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
