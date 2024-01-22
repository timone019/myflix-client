import React from "react";

function UserInfo({ email, name, birthday }) {
  // Add logic to fetch user info or receive props
  return (
    <>
      <h4>Your Info</h4>
      <p>Name: {name}</p>
      <p>e-mail: {email}</p>
      <p>Birthday: {birthday}</p>
    </>
  );
}

export default UserInfo;
