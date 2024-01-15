import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Alert from "react-bootstrap/Alert";

export const SignupView = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setLoading(true);
    // setError(null);

    const data = {
      FullName: fullName,
      Username: username,
      Email: email,
      Password: password,
      Birthday: birthday,
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
      <Form.Group controlId="signupformFullName">
        <Form.Label>Full Name:</Form.Label>
        <Form.Control
          type="text"
          value={fullName}
          placeholder="First & Last Name"
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="signupformUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          minLength="6"
          pattern="^[a-zA-Z0-9]+$"
          title="Username can only contain letters and numbers"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="signupformPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          minLength="8"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least one special character and 8 or more characters."
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="signupformEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="signupformBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <div>
        <Button className="signup-button mt-3" variant="primary" type="submit">
          Sign Up
        </Button>
      </div>
    </Form>
  );
};
