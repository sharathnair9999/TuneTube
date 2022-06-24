import "./HorizontalCard.css";

import React from "react";
import { useVideos } from "../../contexts";

import { Link, useNavigate } from "react-router-dom";
import VideoActionSection from "../VideoActions/VideoActionSection";

const HorizontalCard = ({
  video,
  sNo,
  historyCard,
  likeCard,
  watchLaterCard,
  playlistCard,
  playlistId,
}) => {
  const { getThumbnail } = useVideos();
  const { _id, title, creator, creatorImg, duration } = video;
  const thumbnai = getThumbnail(_id);
  const navigate = useNavigate();
  return (
    <div className="like-card flex justify-center items-fs px-1">
      <span className="pr-1 serial-no pt-1">{sNo + 1}</span>
      <div className="relative-container">
        <img
          src={thumbnai}
          alt={title}
          onClick={() => navigate(`/explore/${_id}`)}
          className="responsive-img thumbnail object-cover pointer"
        />
        <span className="duration">{duration}</span>
      </div>
      <div className="card-text">
        <p className="card-title">
          <Link className="w-100" to={`/explore/${_id}`}>
            {title}
          </Link>
        </p>
        <section className="flex justify-fs items-center">
          <img
            src={creatorImg}
            alt={creator}
            className="creator-img responsive-img object-cover"
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
        playlistCard={playlistCard}
        playlistId={playlistId}
      />
    </div>
  );
};

export default HorizontalCard;
