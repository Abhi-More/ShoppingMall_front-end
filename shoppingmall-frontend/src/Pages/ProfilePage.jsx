import React from "react";
import { Link } from "react-router-dom";
const ProfilePage = () => {
  return (
    <>
      <h1>
        <center>Profile Page</center>
      </h1>
      <center>
        <b>
          {" "}
          <Link to="/">Logout</Link>
        </b>{" "}
      </center>
    </>
  );
};
export default ProfilePage;
