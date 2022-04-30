import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useVideos } from "../../contexts";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

const Like = () => {
  const navigate = useNavigate();
  const {
    addToLikedVideos,
    removeFromLikedVideos,
    userState: { likedVideos, isLoggedIn },
  } = useAuth();
  const {
    videosState: { currVideo },
  } = useVideos();

  const isVideoLiked = likedVideos.some((video) => video._id === currVideo._id);
  const handleLike = (video) => {
    isLoggedIn
      ? !isVideoLiked
        ? addToLikedVideos(video)
        : removeFromLikedVideos(currVideo._id)
      : navigate("/login");
  };
  return (
    <button onClick={() => handleLike(currVideo)}>
      {isLoggedIn ? (
        !isVideoLiked ? (
          <AiOutlineLike />
        ) : (
          <AiFillLike />
        )
      ) : (
        <AiOutlineLike />
      )}
    </button>
  );
};

export default Like;
