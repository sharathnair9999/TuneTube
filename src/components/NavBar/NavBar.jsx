import React from "react";
import { constants } from "../../app-utils";
import { useClickOutside } from "../../custom-hooks";
import "./NavBar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  AiOutlineCloseCircle,
  AiFillLike,
  AiOutlineHistory,
} from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdExplore, MdWatchLater } from "react-icons/md";
import { ImList } from "react-icons/im";
import { useAuth } from "../../contexts";
import UserAvatar from "../UserAvatar/UserAvatar";

const NavBar = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useClickOutside(false);
  const navigate = useNavigate();

  const {
    userState: { isLoggedIn, firstName, lastName },
    logoutUser,
  } = useAuth();

  const navLinks = [
    {
      link: "/explore",
      linkName: "Explore",
      icon: <MdExplore size={"1.2rem"} />,
    },
    { link: "/liked", linkName: "Liked", icon: <AiFillLike size={"1.2rem"} /> },
    {
      link: "/playlists",
      linkName: "Playlists",
      icon: <ImList size={"1.2rem"} />,
    },
    {
      link: "/history",
      linkName: "History",
      icon: <AiOutlineHistory size={"1.2rem"} />,
    },
    {
      link: "/watch-later",
      linkName: "Watch Later",
      icon: <MdWatchLater size={"1.2rem"} />,
    },
  ];

  return (
    <div className={`navbar-container`} ref={ref}>
      <section className={`open-btn-section`}>
        <button
          className="nav-toggler"
          onClick={() => {
            setIsComponentVisible(!isComponentVisible);
          }}
        >
          <GiHamburgerMenu />
        </button>
        <span className="border"></span>
      </section>
      <Link
        className="logo-container flex justify-fs items-center gap-xsm"
        to={"/"}
      >
        <img
          src={constants.imgUrls.logo}
          alt="unbox tube"
          className="responsive-img logo-img"
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

      <aside
        className={`${
          isComponentVisible ? "show-side-nav" : "hide-side-nav"
        } navbar`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <nav>
          <section className="close-btn-section ">
            <button
              className="nav-toggler"
              onClick={() => setIsComponentVisible(!isComponentVisible)}
            >
              <AiOutlineCloseCircle />
            </button>
          </section>
          <ul className="options">
            {navLinks?.map(({ link, linkName, icon }) => (
              <li
                key={link}
                onClick={() => setIsComponentVisible(!isComponentVisible)}
              >
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${
                      isActive && "active"
                    } flex justify-fs items-center`
                  }
                  to={link}
                >
                  {icon}
                  <span>{linkName}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default NavBar;
