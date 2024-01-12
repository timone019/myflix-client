import React, { useState } from "react";
//import { Form } from "react-bootstrap/lib/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your sign-up logic here, such as sending the form data to the server
    // You can access the values of fullName, username, email, password, and birthday here
    console.log(fullName, username, email, password, birthday);
    const data = {
      fullName: fullName,
      username: username,
      email: email,
      password: password,
      birthday: birthday,
    };

    fetch("https://ajmovies-fc7e7627ec3d.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFullName">
        <Form.Label>Full Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          value={username}
          minLength="6"
          pattern="^[a-zA-Z0-9]+$"
          title="Username can only contain letters and numbers"
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          minLength={8}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          placeholder="Birthday"
          value={Birthday}
          onChange={(event) => setBirthday(event.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};
