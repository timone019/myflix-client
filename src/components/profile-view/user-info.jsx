import React from "react";

function UserInfo({ email, username, birthday }) {
  const formattedBirthday = new Date(birthday);
  const month = formattedBirthday.toLocaleString("default", { month: "long" });
  const day = formattedBirthday.getDate();
  const year = formattedBirthday.getFullYear();
  // Add logic to fetch user info or receive props
  return (
    <>
      <h4>User Info</h4>
      <p>User Name: {username}</p>
      <p>E-mail: {email}</p>
      <p>Birthday: {`${month} ${day}, ${year}`}</p>
    </>
  );
}

export default UserInfo;
