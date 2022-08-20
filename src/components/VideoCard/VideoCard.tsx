import "./VideoCard.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useVideos } from "../../contexts";
import VideoActionSection from "../VideoActions/VideoActionSection";
import { VideoType } from "../../contexts/Video-Context/VideoContext.types";

const VideoCard = ({ video }: { video: VideoType }) => {
  const { _id, title, creator, creatorImg, duration } = video;
  const navigate = useNavigate();

  const { getThumbnail } = useVideos();
  return (
    <div className="video-card">
      <div className="relative-container">
        <img
          className="thumbnail object-cover pointer"
          onClick={() => navigate(`./${_id}`)}
          src={getThumbnail(_id)}
          alt={title}
        />
        <span className="duration">{duration}</span>
      </div>
      <div className="video-card-details">
        <img
          src={creatorImg}
          alt="creator"
          className="creator-img object-cover"
        />
        <section className="video-card-text">
          <p className="card-title">{title}</p>
          <small className="creator-name">{creator}</small>
        </section>
        <VideoActionSection video={video} exploreCard />
      </div>
    </div>
  );
};

export default VideoCard;
