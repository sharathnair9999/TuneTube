import React from "react";
import { MdPlaylistAdd, MdPlaylistAddCheck } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth, useVideos } from "../../contexts";

const PlaylistButton = () => {
  const navigate = useNavigate();
  const {
    userState: { playlists, isLoggedIn },
  } = useAuth();

  const handlePlaylistAction = (video) => {
    console.log("playlist");
  };
  const {
    videosState: { currVideo },
  } = useVideos();
  return (
    <button className="btn-transparent">
      <MdPlaylistAdd color="white" size={"1.2rem"} />
    </button>
  );
};

export default PlaylistButton;
