import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

export const SignupView = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const data = {
      fullName: fullName,
      username: username,
      email: email,
      password: password,
      birthday: birthday,
    };

    try {
      const response = await fetch(
        "https://ajmovies-fc7e7627ec3d.herokuapp.com/users",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      alert("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formFullName">
        <Form.Label>Full Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />
      </Form.Group>
      {/* ... (similar modifications for other form groups) */}
      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </Button>
    </Form>
  );
};
