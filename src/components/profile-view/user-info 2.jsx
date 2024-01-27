import React from "react";

function UserInfo({ email, username, birthday }) {
  // Add logic to fetch user info or receive props
  return (
    <>
      <h4>User Info</h4>
      <p>User Name: {username}</p>
      <p>E-mail: {email}</p>
      <p>Birthday: {birthday}</p>
    </>
  );
}

export default UserInfo;
