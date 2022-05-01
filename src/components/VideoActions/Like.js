import React from "react";
import { useAuth } from "../../contexts";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";

const Like = ({ video }) => {
  const navigate = useNavigate();
  const {
    addToLikedVideos,
    removeFromLikedVideos,
    userState: { likedVideos, isLoggedIn },
  } = useAuth();

  const isVideoLiked = likedVideos.some(
    (likedVideo) => likedVideo._id === video._id
  );
  const handleLike = () => {
    isLoggedIn
      ? !isVideoLiked
        ? addToLikedVideos(video)
        : removeFromLikedVideos(video._id)
      : navigate("/login");
  };
  return (
    <button
      className="btn-transparent"
      data-tip={`${
        isLoggedIn ? (!isVideoLiked ? "Like" : "Remove Like") : "Like"
      }`}
      onClick={() => handleLike()}
    >
      <ReactTooltip place="top" effect="solid" />
      {isLoggedIn ? (
        !isVideoLiked ? (
          <AiOutlineLike color="white" size={"1.2rem"} />
        ) : (
          <AiFillLike color="white" size={"1.2rem"} />
        )
      ) : (
        <AiOutlineLike color="white" size={"1.2rem"} />
      )}
    </button>
  );
};

export default Like;
