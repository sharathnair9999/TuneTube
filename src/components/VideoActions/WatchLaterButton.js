import React from "react";
import { MdOutlineWatchLater, MdWatchLater } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { useAuth } from "../../contexts";

const WatchLaterButton = ({ video }) => {
  const navigate = useNavigate();
  const {
    addToWatchLater,
    removeFromWatchLater,
    userState: { watchlater, isLoggedIn },
  } = useAuth();

  const isInWatchLater = watchlater?.some(
    (watchLaterVideo) => watchLaterVideo._id === video._id
  );
  const handleWatchLater = () => {
    isLoggedIn
      ? !isInWatchLater
        ? addToWatchLater(video)
        : removeFromWatchLater(video._id)
      : navigate("/login");
  };
  return (
    <button
      className="btn-transparent"
      data-tip={`${
        isLoggedIn
          ? !isInWatchLater
            ? "Watch Later"
            : "Watched Enough"
          : "Watch Later"
      }`}
      onClick={() => handleWatchLater()}
    >
      <ReactTooltip place="top" effect="solid" />
      {isLoggedIn ? (
        !isInWatchLater ? (
          <MdOutlineWatchLater color="white" size={"1.2rem"} />
        ) : (
          <MdWatchLater color="white" size={"1.2rem"} />
        )
      ) : (
        <MdOutlineWatchLater color="white" size={"1.2rem"} />
      )}
    </button>
  );
};

export default WatchLaterButton;
