import React from "react";
import "./Footer.css";
import { AiFillGithub } from "react-icons/ai";
import { BsTwitter, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer">
      <nav className="socials">
        <span>Socials</span>
        <ul>
          <li>
            <a
              href="https://github.com/sharathnair9999"
              target={"_blank"}
              rel="noreferrer"
            >
              <AiFillGithub size={"1.3rem"} />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/Nairified"
              target={"_blank"}
              rel="noreferrer"
            >
              <BsTwitter size={"1.3rem"} />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/sharath99/"
              target={"_blank"}
              rel="noreferrer"
            >
              <BsLinkedin size={"1.3rem"} />
            </a>
          </li>
        </ul>
      </nav>
      <span className="border" ></span>
      <article className="note flex justify-center items-fs flex-col gap-sm">
      <span>This application is for illustration purpose.</span>
        <span>
           Copyright © 2022 by <em>P. Sharath</em>
        </span>
      </article>
    </footer>
  );
};

export default Footer;
