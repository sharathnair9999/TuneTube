import "./HorizontalCard.css";

import React from "react";
import { useVideos } from "../../contexts";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const HorizontalCard = ({ video }) => {
  const { getThumbnail } = useVideos();
  const { _id, title, creator, creatorImg } = video;
  const thumbnai = getThumbnail(_id);
  return (
    <div className="like-card flex justify-fs items-fs  w-100">
      <Link to={`/explore/${_id}`}>
        <img src={thumbnai} alt={title} className="responsive-img" />
      </Link>
      <div className="card-text ">
        <p className="card-title">
          <Link to={`/explore/${_id}`}>{title}</Link>
        </p>
        <section className="creator-info flex justify-fs items-center">
          <img
            src={creatorImg}
            alt={creator}
            className="creator-img responsive-img"
          />
          <small>{creator}</small>
        </section>
      </div>
      <section className="video-actions-container">
      <button className="btn-transparent video-actions-btn">
        <IoEllipsisVerticalOutline color="white" size={"1rem"} />
      </button>
      </section>
    </div>
  );
};

export default HorizontalCard;
