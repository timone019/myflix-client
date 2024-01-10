import React, { useState } from "react";

export const SignupView = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your sign-up logic here, such as sending the form data to the server
    // You can access the values of fullName, username, email, password, and birthdate here
    console.log(fullName, username, email, password, birthdate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        minLength={5}
        onChange={(event) => setFullName(event.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        minLength="6"
        pattern="^[a-zA-Z0-9]+$"
        title="Username can only contain letters and numbers"
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        minLength={8}
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
        onChange={(event) => setPassword(event.target.value)}
      />
      <input
        type="date"
        placeholder="Birthdate"
        value={birthdate}
        onChange={(event) => setBirthdate(event.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};
