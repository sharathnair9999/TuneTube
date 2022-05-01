import React from "react";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { useClickOutside } from "../../custom-hooks";
import Like from "./Like";
import PlaylistButton from "./PlaylistButton";
import "./VideoActions.css";
import WatchLaterButton from "./WatchLaterButton";

const VideoActionSection = ({ video }) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useClickOutside(false);
  return (
    <div ref={ref} className="video-actions-container">
      <button
        onClick={() => setIsComponentVisible(!isComponentVisible)}
        className="btn-transparent video-actions-btn"
      >
        <IoEllipsisVerticalOutline color="white" size={"1rem"} />
      </button>
      <section
        className={`video-action-btns flex-and-center ${
          isComponentVisible ? "show-options" : "hide-options"
        }  gap-1`}
        onMouseLeave={() => setIsComponentVisible(false)}
      >
        <Like video={video} />
        <WatchLaterButton video={video} />
        <PlaylistButton video={video} />
      </section>
    </div>
  );
};

export default VideoActionSection;
