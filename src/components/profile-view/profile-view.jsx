import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./profile-view.scss";
import axios from "axios";
import UserInfo from "./user-info";

export function ProfileView({ movies, onUpdateUserInfo }) {
  const [user, setUser] = useState({});

  const favoriteMoviesList = movies.filter((movie) => movie.isFavorite);

  const getUser = () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    axios
      .get(`https://myflix-movies.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    axios
      .put(`https://myflix-movies.herokuapp.com/users/${username}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeFav = (id) => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    axios
      .delete(
        `https://myflix-movies.herokuapp.com/users/${username}/movies/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <UserInfo name={user.Username} email={user.Email} />
      <div>
        <h2>Favorite Movies</h2>
        {favoriteMoviesList.map((movie) => {
          return (
            <div key={movie._id}>
              <img src={movie.ImagePath} />
              <Link to={`/movies/${movie._id}`}>
                <h4>{movie.Title}</h4>
              </Link>
              <button variant="secondary" onClick={() => removeFav(movie._id)}>
                Remove from list
              </button>
            </div>
          );
        })}
        <form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
          <h2>Want to change some info?</h2>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            defaultValue={user.username}
            onChange={(e) => handleUpdate(e)}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            defaultValue={user.password}
            onChange={(e) => handleUpdate(e)}
          />
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            onChange={(e) => handleUpdate(e)}
          />
        </form>
      </div>
    </div>
  );
}
