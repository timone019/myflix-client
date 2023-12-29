import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Predator",
      image: "https://lumiere-a.akamaihd.net/v1/images/predator_feature-poster_584x800_6ec38255.jpeg?region=0%2C0%2C584%2C800",
      director: "John McTiernan"
    },
     {
      id: 2,
      title: "The Terminator",
      image: "https://m.media-amazon.com/images/I/A1wiVBc2VLL._SL1500_.jpg",
      director: "James Cameron"
    },
       {
      id: 3,
      title: "The Wolverine",
      image: "https://m.media-amazon.com/images/I/91Xul-LKAEL._AC_SY741_.jpg",
      director: "James Mangold"
    },
     ]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
    <div>
      <button
        onClick={() => {
          alert("Nice!");
        }}
      >
        Click me!
      </button>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
