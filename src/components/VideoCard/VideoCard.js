import "./VideoCard.css";
import ReactTooltip from "react-tooltip";
import React from "react";

const VideoCard = ({ video }) => {
  const { _id, title, description, creator, uploadedOn, category, creatorImg } =
    video;
  return (
    <div className="video-card">
      <ReactTooltip
        place="bottom"
        effect="solid"
      />
      <img
        className="thumbnail"
        src={`http://i3.ytimg.com/vi/${_id}/maxresdefault.jpg`}
        alt={title}
      />
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
