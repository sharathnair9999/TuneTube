import React from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";
import { AiFillDelete } from "react-icons/ai";

const PlaylistButton = ({ video, playlistCard, playlistId }) => {
  const navigate = useNavigate();
  const {
    userState: { isLoggedIn },
    handlePlaylistModal,
    deleteVideoFromPlaylist,
  } = useAuth();

  const handlePlaylistAction = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    playlistCard
      ? deleteVideoFromPlaylist(playlistId, video._id)
      : handlePlaylistModal(true, video, false);
  };
  return (
    <button
      onClick={handlePlaylistAction}
      data-tip={playlistCard ? "Delete From Playlist" : "Add to Playlist"}
      className="btn-transparent"
    >
      {playlistCard ? (
        <AiFillDelete color="#dc2626" size={"1.2rem"} />
      ) : (
        <MdPlaylistAdd color="white" size={"1.2rem"} />
      )}
    </button>
  );
};

export default PlaylistButton;
