import React from "react";
import { useAuth } from "../../contexts";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

const Like = ({ video }) => {
  const {
    addToLikedVideos,
    removeFromLikedVideos,
    userState: { likedVideos, isLoggedIn },
  } = useAuth();

  const isVideoLiked = likedVideos.some(
    (likedVideo) => likedVideo._id === video._id
  );
  const handleLike = () => {
    !isVideoLiked ? addToLikedVideos(video) : removeFromLikedVideos(video._id);
  };
  return (
    <button className="btn-transparent" onClick={() => handleLike()}>
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
