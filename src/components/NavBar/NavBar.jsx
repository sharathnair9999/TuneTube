import React from "react";
import { constants } from "../../app-utils";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts";
import UserAvatar from "../UserAvatar/UserAvatar";

const NavBar = () => {
  const navigate = useNavigate();

  const {
    userState: { isLoggedIn, firstName, lastName },
    logoutUser,
  } = useAuth();

  return (
    <div className={`navbar-container`}>
      <Link
        className="logo-container flex justify-fs items-center gap-xsm"
        to={"/"}
      >
        <img
          src={constants.imgUrls.logo}
          alt="unbox tube"
          className="responsive-img logo-img object-cover"
        />
        <span className="logo-text">
          <span className="word word-1">UnboxTube</span>
        </span>
      </Link>
      {!isLoggedIn && (
        <button
          className="login-btn btn-primary btn"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}
      {isLoggedIn && (
        <UserAvatar
          logoutUser={logoutUser}
          firstName={firstName}
          lastName={lastName}
          isLoggedIn={isLoggedIn}
        />
      )}
    </div>
  );
};

export default NavBar;
