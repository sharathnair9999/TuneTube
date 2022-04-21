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
import { Link, NavLink } from "react-router-dom";
import { MdExplore, MdWatchLater } from "react-icons/md";
import { ImList } from "react-icons/im";

const NavBar = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useClickOutside(false);

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
      <Link className="logo-container flex-and-center gap-xsm" to={"/"}>
        <img
          src={constants.imgUrls.logo}
          alt="unbox tube"
          className="responsive-img logo-img"
        />
        <span className="font-xl logo-text">
          <span className="word word-1">UnboxTube</span>
        </span>
      </Link>

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
          <ul
            className="options"
            onClick={() => setIsComponentVisible(!isComponentVisible)}
          >
            <li>
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive && "active"} flex justify-fs items-center`
                }
                to={"/explore"}
              >
                <MdExplore  size={"1.2rem"}/>
                <span>Explore</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive && "active"} flex justify-fs items-center`
                }
                to={"/liked"}
              >
                <AiFillLike  size={"1.2rem"}/>
                <span>Liked</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive && "active"} flex justify-fs items-center`
                }
                to={"/playlists"}
              >
                <ImList  size={"1.2rem"}/>
                <span>Playlists</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive && "active"} flex justify-fs items-center`
                }
                to={"/history"}
              >
                <AiOutlineHistory  size={"1.2rem"}/>
                <span>History</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive && "active"} flex justify-fs items-center`
                }
                to={"/watch-later"}
              >
                <MdWatchLater  size={"1.2rem"}/>
                <span>Watch Later</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default NavBar;
