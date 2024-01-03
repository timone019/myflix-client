import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}>
      {movie.title}
    </div>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Director: PropTypes.string,
    Description: PropTypes.string,
    genre: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
