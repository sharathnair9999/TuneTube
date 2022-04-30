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
    <button className="btn-transparent" onClick={() => handleLike(currVideo)}>
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
