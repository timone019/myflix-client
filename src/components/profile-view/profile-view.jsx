import { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import UserInfo from "./user-info";
import UpdateUser from "./update-user";

export function ProfileView({
  movies,
  user,
  setUser,
  addFav,
  removeFav,
  favMovies,
}) {
  console.log(user);

  const [favoriteMovies, setFavoriteMovies] = useState(favMovies);

  useEffect(() => {
    setFavoriteMovies(favMovies);
  }, [favMovies]);

  if (!user) {
    return null;
  }

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              {user && (
                <UserInfo
                  username={user.Username}
                  email={user.Email}
                  birthday={user.Birthday}
                />
              )}
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
        <></>
        <h4>Favorite Movies</h4>
        {movies
          .filter((movie) => favoriteMovies.includes(movie._id))
          .map((movie) => (
            <Col className="mb-4" key={movie._id} md={3}>
              <MovieCard
                movie={movie}
                addFav={addFav}
                removeFav={removeFav}
                isFav={favoriteMovies.includes(movie._id)}
              />
            </Col>
          ))}
        {/* // ) : (
          // <div className="mb-4 primary" style={{ color: "white" }}>
          //   No Favorite Movies Added
          // </div>
        // )} */}
      </Row>
    </Container>
  );
}
