import React from "react";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { VideoType } from "../../contexts/Video-Context/VideoContext.types";
import { useClickOutside } from "../../custom-hooks";
import HistoryButton from "./HistoryButton";
import Like from "./Like";
import PlaylistButton from "./PlaylistButton";
import "./VideoActions.css";
import WatchLaterButton from "./WatchLaterButton";

type VideoActionSectionProps = {
  video: VideoType;
  historyCard?: boolean;
  likeCard?: boolean;
  watchLaterCard?: boolean;
  exploreCard?: boolean;
  playlistCard?: boolean;
  playlistId?: string;
};

const VideoActionSection = ({
  video,
  historyCard,
  likeCard,
  watchLaterCard,
  exploreCard,
  playlistCard,
  playlistId,
}: VideoActionSectionProps) => {
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
        {(likeCard || exploreCard || playlistCard) && <Like video={video} />}
        {historyCard && <HistoryButton video={video} />}
        {(watchLaterCard || exploreCard) && <WatchLaterButton video={video} />}
        {(playlistCard || exploreCard) && (
          <PlaylistButton
            video={video}
            playlistCard={playlistCard}
            playlistId={playlistId}
          />
        )}
      </section>
    </div>
  );
};

export default VideoActionSection;
