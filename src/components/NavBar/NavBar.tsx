import React, { ChangeEvent, useEffect } from "react";
import { constants } from "../../app-utils";
import "./NavBar.css";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { useAuth } from "../../contexts";
import UserAvatar from "../UserAvatar/UserAvatar";

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    userState: { isLoggedIn },
    logoutUser,
  } = useAuth();

  const searchTerm = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const category = searchParams.get("category") || "";

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ sort, category, search: e.target.value });
  };
  useEffect(() => {
    if (searchParams.get("search") && pathname !== "/explore") {
      navigate("/explore");
      return;
    }
  }, [searchTerm, pathname, searchParams, navigate]);

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
      <input
        type="search"
        value={searchTerm}
        placeholder="Search..."
        onChange={searchHandler}
        className="searchbar"
      />
      {!isLoggedIn && (
        <button
          className="login-btn btn-primary btn"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}
      {isLoggedIn && <UserAvatar logoutUser={logoutUser} />}
    </div>
  );
};

export default NavBar;
