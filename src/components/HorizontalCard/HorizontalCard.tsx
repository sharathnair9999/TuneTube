import "./HorizontalCard.css";

import React from "react";
import { useVideos } from "../../contexts";

import { Link, useNavigate } from "react-router-dom";
import HistoryButton from "../VideoActions/HistoryButton";
import WatchLaterButton from "../VideoActions/WatchLaterButton";
import PlaylistButton from "../VideoActions/PlaylistButton";
import Like from "../VideoActions/Like";
import { VideoType } from "../../contexts/Video-Context/VideoContext.types";
type HorizontalCardProps = {
  video: VideoType;
  sNo: number;
  historyCard?: boolean;
  likeCard?: boolean;
  watchLaterCard?: boolean;
  playlistCard?: boolean;
  playlistId?: string;
};

const HorizontalCard = ({
  video,
  sNo,
  historyCard,
  likeCard,
  watchLaterCard,
  playlistCard,
  playlistId,
}: HorizontalCardProps) => {
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
      {likeCard && <Like video={video} />}
      {historyCard && <HistoryButton video={video} />}
      {watchLaterCard && <WatchLaterButton video={video} />}
      {playlistCard && (
        <PlaylistButton
          video={video}
          playlistCard={playlistCard}
          playlistId={playlistId}
        />
      )}
    </div>
  );
};

export default HorizontalCard;
