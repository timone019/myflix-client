import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UpdateUser = ({ user, setUser }) => {
  const [updatedUser, setUpdatedUser] = useState({
    Username: user.Username,
    Password: user.Password,
    Email: user.Email,
    // Add more fields as needed
  });

  const handleUpdate = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add any validation or error handling as needed

    // Make API request to update user
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://ajmovies-fc7e7627ec3d.herokuapp.com/users/${user.Username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        const updatedUserData = await response.json();
        // Update user state in parent component or trigger a callback
        setUser(updatedUserData);
        console.log("User updated successfully:", updatedUserData);
      } else {
        console.error("Error updating user:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <>
      <h4>Update User</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="Username"
            defaultValue={user.Username}
            onChange={(e) => handleUpdate(e)}
            required
            placeholder="Enter a username"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="Password"
            defaultValue=""
            onChange={(e) => handleUpdate(e)}
            required
            minLength="8"
            placeholder="Password must be 8 or more characters"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email Address:</Form.Label>
          <Form.Control
            type="email"
            name="Email"
            defaultValue={user.Email} // This is a controlled component
            onChange={(e) => handleUpdate(e)}
            required
            placeholder="Enter an email address"
          />
        </Form.Group>
        {/* Add more Form.Group elements for additional fields */}
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Form>
    </>
  );
};

export default UpdateUser;
