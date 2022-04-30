import React from "react";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import Like from "./Like";
import PlaylistButton from "./PlaylistButton";
import "./VideoActions.css";
import WatchLaterButton from "./WatchLaterButton";

const VideoActionSection = () => {
  return (
    <div className="video-actions-container">
      <button className="btn-transparent video-actions-btn">
        <IoEllipsisVerticalOutline color="white" size={"1rem"} />
      </button>
      <section className="video-action-btns flex-and-center gap-1">
        <Like />
        <WatchLaterButton />
        <PlaylistButton />
      </section>
    </div>
  );
};

export default VideoActionSection;
