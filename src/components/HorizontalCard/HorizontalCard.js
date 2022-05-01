import "./HorizontalCard.css";

import React from "react";
import { useVideos } from "../../contexts";

import { Link } from "react-router-dom";
import VideoActionSection from "../VideoActions/VideoActionSection";

const HorizontalCard = ({
  video,
  sNo,
  historyCard,
  likeCard,
  watchLaterCard,
}) => {
  const { getThumbnail } = useVideos();
  const { _id, title, creator, creatorImg } = video;
  const thumbnai = getThumbnail(_id);
  return (
    <div className="like-card flex justify-center items-fs  w-100">
      <span className="pr-1 serial-no pt-1">{sNo + 1}</span>
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
      <VideoActionSection
        id={_id}
        video={video}
        historyCard={historyCard}
        likeCard={likeCard}
        watchLaterCard={watchLaterCard}
      />
    </div>
  );
};

export default HorizontalCard;
