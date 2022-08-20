import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  AiOutlineCloseCircle,
  AiFillLike,
  AiOutlineHistory,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { MdExplore, MdWatchLater } from "react-icons/md";
import { ImList } from "react-icons/im";
import { useClickOutside } from "../../custom-hooks";

const SideNav = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useClickOutside(false);

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
    <div ref={ref}>
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
      <aside
        className={`${
          isComponentVisible ? "show-side-nav" : "hide-side-nav"
        } navbar`}
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

export default SideNav;
