import "./VideoCard.css";
import ReactTooltip from "react-tooltip";
import React from "react";
import { Link } from "react-router-dom";
import { useVideos } from "../../contexts";

const VideoCard = ({ video }) => {
  const { _id, title, creator, creatorImg } =
    video;

  const { getThumbnail } = useVideos();
  return (
    <div className="video-card">
      <ReactTooltip place="bottom" effect="solid" />
      <Link to={`./${_id}`}>
        <img className="thumbnail" src={getThumbnail(_id)} alt={title} />
      </Link>
      <div className="video-card-details">
        <img src={creatorImg} alt="creator" className="creator-img" />
        <section className="video-card-text">
          <p className="card-title" data-tip={title}>
            {title}
          </p>
          <small className="creator-name">{creator}</small>
        </section>
      </div>
    </div>
  );
};

export default VideoCard;
