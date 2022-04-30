import React, { useEffect } from "react";
import { useAuth } from "../../contexts";
import "./LikedVideos.css";

const LikedVideos = () => {
  const {
    userState: { likedVideos, allVideos },
    getAllLikedVideos,
  } = useAuth();

  useEffect(() => {
    getAllLikedVideos();
  }, []);

  return <div></div>;
};

export default LikedVideos;
