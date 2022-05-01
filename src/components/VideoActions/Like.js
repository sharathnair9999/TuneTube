import React from "react";
import { useAuth } from "../../contexts";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";

const Like = ({ video }) => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location);
  console.log(navigate);
  const {
    addToLikedVideos,
    removeFromLikedVideos,
    userState: { likedVideos, isLoggedIn },
  } = useAuth();

  const isVideoLiked = likedVideos.some(
    (likedVideo) => likedVideo._id === video._id
  );
  const handleLike = () => {
    isLoggedIn ? !isVideoLiked ? addToLikedVideos(video) : removeFromLikedVideos(video._id) : navigate("/login");
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
