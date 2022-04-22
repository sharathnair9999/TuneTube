import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import { Categories } from "../../components";
import { constants } from "../../app-utils";

const Landing = () => {
  return (
    <div>
      <div className="landing-container">
        <img
          src={constants.imgUrls.landing_hero_img}
          alt="hero landing"
          className="responsive-img"
        />
        <div className="landing-content">
          <p className="landing-text">
            This is the one place where you get to see your favourite gadgets
            being unboxed, reviewed, tested, broke down and trolled. What are
            you waiting for?
          </p>
          <div className="landing-btns">
            <Link className="btn btn-secondary" to={"/explore"}>
              Explore Videos
            </Link>
            <Link className="btn btn-primary" to={"/signup"}>
              Join Now
            </Link>
          </div>
        </div>
      </div>
      <Categories />
    </div>
  );
};

export default Landing;
